import React from "react";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.onClose}
            ></button>
          </header>
          <section className="modal-card-body">{this.props.children}</section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.props.onSave}>
              Save changes
            </button>
            <button className="button" onClick={this.props.onClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>,
      this.el
    );
  }
}

export default Modal;
