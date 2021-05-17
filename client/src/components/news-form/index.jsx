import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.scss";
import { StoreContext } from "context";

export default function NewsForm(props) {
  const { storeData } = useContext(StoreContext);

  const history = useHistory();
  const [formData, setFormData] = useState(
    props.formData ?? {
      miniatureContent: "",
      miniatureColor: "",
      categoryId: storeData.dictionaryData["news_category"][0].id,
      miniatureSize: "",
      miniatureSubtitle: "",
      miniatureTitle: "",
      subtitle: "",
      title: "",
    }
  );

  const [editorState, setEditorState] = useState(
    props.formData && props.formData.content
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.formData.content))
        )
      : EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(
    props.formData && props.formData.content
      ? JSON.parse(props.formData.content)
      : null
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    setConvertedContent(convertToRaw(state.getCurrentContent()));
  };

  function onChangeHandler(value, fieldName) {
    setFormData({ ...formData, [fieldName]: value });
  }

  async function onSubmitHandler() {
    const payload = Object.entries(formData).reduce(
      (newPayload, [key, value]) => {
        if (value !== "") {
          newPayload[key] = value;
        }
        return newPayload;
      },
      {}
    );
    payload.content = await JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    payload.categoryId = parseInt(payload.categoryId);

    props
      .request(payload)
      .then(() => {
        history.push("/admin/news-list");
      })
      .catch((error) => {});
  }

  return (
    <div className="container mt-3 px-3">
      <div className="field">
        <label className="label">title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={formData.title}
            onChange={(e) => onChangeHandler(e.target.value, "title")}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">subtitle</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={(e) => onChangeHandler(e.target.value, "subtitle")}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">miniature title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={formData.miniatureTitle}
            onChange={(e) => onChangeHandler(e.target.value, "miniatureTitle")}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">miniature subtitle</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={formData.miniatureSubtitle}
            onChange={(e) =>
              onChangeHandler(e.target.value, "miniatureSubtitle")
            }
          />
        </div>
      </div>

      <div className="field is-grouped is-justify-content-space-between">
        <div>
          <label className="label mr-2 mb-0">miniature color</label>
          <div className="control">
            <div className="select">
              <select
                className="is-primary"
                value={formData.miniatureColor}
                onChange={(e) =>
                  onChangeHandler(e.target.value, "miniatureColor")
                }
              >
                <option>None</option>
                <option className="has-text-primary" value="is-primary">
                  Primary
                </option>
                <option className="has-text-link" value="is-link">
                  Link
                </option>
                <option className="has-text-info" value="is-info">
                  Info
                </option>
                <option className="has-text-success" value="is-success">
                  Success
                </option>
                <option className="has-text-warning" value="is-warning">
                  warning
                </option>
                <option className="has-text-danger" value="is-danger">
                  danger
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="pl-6">
          <label className="label mr-2 mb-0">miniature size</label>
          <div className="control">
            <div className="select">
              <select
                className="is-primary"
                value={formData.miniatureSize}
                onChange={(e) =>
                  onChangeHandler(e.target.value, "miniatureSize")
                }
              >
                <option value={null}></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pl-6">
          <label className="label mr-2 mb-0">category</label>
          <div className="control">
            <div className="select">
              <select
                className="is-primary"
                value={formData.categoryId}
                onChange={(e) => onChangeHandler(e.target.value, "categoryId")}
              >
                {storeData.dictionaryData["news_category"].map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">miniature content</label>
        <div className="control">
          <textarea
            className="textarea"
            name="miniatureContent"
            placeholder="Textarea"
            value={formData.miniatureContent}
            maxLength={512}
            onChange={(e) =>
              onChangeHandler(e.target.value, "miniatureContent")
            }
          />
        </div>
      </div>

      <div className="field">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>
      {convertedContent !== null && (
        <div className="field">
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: draftToHtml(convertedContent),
            }}
          />
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={onSubmitHandler}>
            Submit
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link is-light"
            onClick={() => history.push("/admin/news-list")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
