import React from "react";

export default function Home() {
  return (
    <section className="hero is-info is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Hello on News Blog</h1>
          <h2 className="subtitle">Web app blog with admin</h2>
        </div>
      </div>

      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li className="is-active">
                <a href="/">Examples</a>
              </li>
              <li>
                <a href="/">home</a>
              </li>
              <li>
                <a href="/">page</a>
              </li>
              <li>
                <a href="/">footer</a>
              </li>
              <li>
                <a href="/">buttons</a>
              </li>
              <li>
                <a href="/">Components</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
}
