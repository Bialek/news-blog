import React from "react";
import NewsService from "services/news/index";

export default function AdminAddArticle() {
  function onSubmitHandler(event) {
    event.preventDefault();

    const miniatureSize =
      event.target.miniatureSize.value === ""
        ? null
        : event.target.miniatureSize.value;
    const img = event.target.img.value === "" ? null : event.target.img.value;

    const payload = {
      title: event.target.title.value,
      header: event.target.header.value,
      content: event.target.content.value,
      img,
      miniatureContent: event.target.miniatureContent.value,
      miniatureColor: event.target.miniatureColor.value,
      miniatureIsVertical: event.target.miniatureIsVertical.checked,
      miniatureSize,
    };

    NewsService.create(payload);
  }

  return (
    <div className="container mt-3 px-3">
      <form onSubmit={onSubmitHandler}>
        <div className="field">
          <label className="label">title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Text input"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">header</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="header"
              placeholder="Text input"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">img link</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="img"
              placeholder="http or https"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">miniature content</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="miniatureContent"
              placeholder="Text input"
            />
          </div>
        </div>

        <div className="field is-grouped is-justify-content-space-between">
          <div>
            <label className="label mr-2 mb-0">miniature color</label>
            <div className="control">
              <div className="select">
                <select className="is-primary" name="miniatureColor">
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
                <select className="is-primary" name="miniatureSize">
                  <option> </option>
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
              <input type="checkbox" name="miniatureIsVertical" /> Vertical
              minature?
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">content</label>
          <div className="control">
            <textarea
              className="textarea"
              name="content"
              placeholder="Textarea"
            />
          </div>
        </div>

        <div className="field"></div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
