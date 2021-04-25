import { StoreContext } from "context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const { storeData } = useContext(StoreContext);

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
              {storeData &&
                storeData.dictionaryData["news_category"] &&
                storeData.dictionaryData["news_category"].map((category) => (
                  <li>
                    <Link to={`/news-list/${category.id}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
}
