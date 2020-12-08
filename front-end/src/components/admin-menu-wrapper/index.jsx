import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenuWrapper(props) {
  return (
    <div className="columns">
      <div className="column is-2">
        <aside className="menu mt-3 ml-3">
          <p className="menu-label">Administration</p>
          <ul className="menu-list">
            <li>
              <NavLink
                activeClassName="is-active"
                to="/admin/dashboard"
                exact={true}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="is-active"
                to="/admin/articles-list"
                exact={true}
              >
                Article list
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="is-active"
                to="/admin/add-article"
                exact={true}
              >
                Add Article
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
      <div className="column">{props.children}</div>
    </div>
  );
}
