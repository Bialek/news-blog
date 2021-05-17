import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";

export default function NewsMiniature({ news }) {
  const history = useHistory();

  function onClickHandler() {
    history.push(`/news/${news.newsId}`);
  }

  return (
    <div
      className={`tile is-parent ${
        news.miniatureIsVertical ? "is-vertical" : ""
      }`}
      onClick={onClickHandler}
    >
      <article
        className={`tile is-child box ${
          news.miniatureColor ? `notification ${news.miniatureColor}` : ""
        }`}
      >
        <p className="title">{news.miniatureTitle}</p>
        <p className="subtitle">{news.miniatureSubtitle}</p>
        {news.img && (
          <figure className="image is-4by3">
            <img src={news.img} alt={news.miniatureTitle} />
          </figure>
        )}
        {news.miniatureContent && (
          <div className="content">{news.miniatureContent}</div>
        )}
      </article>
    </div>
  );
}
