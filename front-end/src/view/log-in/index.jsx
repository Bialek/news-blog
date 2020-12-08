import React, { useState, useContext } from "react";
import UserService from "services/user";
import { useHistory } from "react-router-dom";
import { UserContext } from "context";

export default function LogIn() {
  const [message, setMessage] = useState(undefined);
  let history = useHistory();
  const { setUserData } = useContext(UserContext);

  function onSubmitHandler(event) {
    event.preventDefault();
    setMessage(undefined);

    const payload = {
      login: event.target.login.value,
      password: event.target.password.value,
    };

    UserService.logIn(payload)
      .then((response) => {
        setUserData(response);
        history.push("/");
      })
      .catch((error) => {
        setMessage({ type: "danger", text: `Error! ${error.message}` });
      });
  }

  return (
    <section className="section">
      <div className="container mt-3">
        <h1 className="title">Log in page</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                name="login"
                type="text"
                placeholder="Login"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">Login</button>
            </p>
          </div>
        </form>
      </div>
      {message && (
        <article className={`message is-${message.type} mt-6`}>
          <div className="message-body">{message.text}</div>
        </article>
      )}
    </section>
  );
}
