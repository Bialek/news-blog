import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "logo.png";
import { UserContext } from "context";

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { userData } = useContext(UserContext);

  return (
    <nav
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/" exact={true}>
            <img src={Logo} width="112" height="28" alt="logo" />
          </NavLink>

          <span
            onClick={() => setIsMenuActive(!isMenuActive)}
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div className={`navbar-menu  ${isMenuActive && "is-active"}`}>
          <div className="navbar-start">
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/"
              exact={true}
            >
              Home
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/articles"
            >
              Articles
            </NavLink>

            {userData.hasAdminPermissions && (
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/admin/dashboard"
              >
                admin
              </NavLink>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {userData.logged ? (
                  <>
                    <div className="media-content mr-3">
                      <p className="title is-4 has-text-white">{`${userData.name} ${userData.surname}`}</p>
                    </div>
                    <NavLink className="button is-primary" to="/sign-up">
                      <strong>Sing out</strong>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className="button is-primary" to="/sign-up">
                      <strong>Sign up</strong>
                    </NavLink>
                    <NavLink className="button is-light" to="/log-in">
                      Log in
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
