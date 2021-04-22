import React, { useState } from "react";
import { useHistory } from "react-router";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.scss";

export default function NewsForm(props) {
  const history = useHistory();
  const [formData, setFormData] = useState(
    props.formData ?? {
      miniatureContent: "",
      miniatureColor: "",
      miniatureIsVertical: false,
      miniatureSize: "",
      miniatureSubtitle: "",
      miniatureTitle: "",
      subtitle: "",
      title: "",
    }
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  function onChangeHandler(value, fieldName) {
    setFormData({ ...formData, [fieldName]: value });
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    const payload = Object.entries(formData).reduce(
      (newPayload, [key, value]) => {
        if (value !== "") {
          newPayload[key] = value;
        }
        return newPayload;
      },
      {}
    );

    payload.content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

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

        <div className="control pl-6">
          <label className="checkbox">
            <input
              type="checkbox"
              value={formData.miniatureIsVertical}
              onChange={(e) =>
                onChangeHandler(e.target.checked, "miniatureIsVertical")
              }
            />
            Vertical minature?
          </label>
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
            className="preview"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(convertedContent),
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
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
}
