import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";

export default function ArticleMiniature({ article }) {
  const history = useHistory();

  function onClickHandler() {
    history.push(`/article/${article.id}`);
  }

  return (
    <div
      className={`tile is-parent ${
        article.miniatureIsVertical ? "is-vertical" : ""
      } ${article.miniatureSize ? `is-${article.miniatureSize}` : ""} `}
      onClick={onClickHandler}
    >
      <article
        className={`tile is-child box ${
          article.miniatureColor ? `notification ${article.miniatureColor}` : ""
        }`}
      >
        <p className="title">{article.title}</p>
        <p className="subtitle">{article.header}</p>
        {article.img && (
          <figure className="image is-4by3">
            <img src={article.img} alt={article.title} />
          </figure>
        )}
        {article.miniatureContent && (
          <div className="content">{article.miniatureContent}</div>
        )}
      </article>
    </div>
  );
}
