import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "logo.png";
import { StoreContext } from "context";
import { ROLE_ADMIN, STORAGE_TOKEN_KEY } from "utils/constants";

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { storeData, setStoreData } = useContext(StoreContext);

  const signOutHandler = () => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    setStoreData((prevData) => ({ ...prevData, userData: undefined }));
  };
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
              to="/news-list"
            >
              News
            </NavLink>

            {storeData.userData &&
              storeData.userData.roles.includes(ROLE_ADMIN) && (
                <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/admin/dashboard"
                >
                  Admin
                </NavLink>
              )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {storeData.userData ? (
                  <>
                    <div className="media-content mr-3">
                      <p className="title is-4 has-text-white">{`${storeData.userData.username}`}</p>
                    </div>
                    <div onClick={signOutHandler}>
                      <NavLink className="button is-primary" to="/">
                        <strong>Sing out</strong>
                      </NavLink>
                    </div>
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
