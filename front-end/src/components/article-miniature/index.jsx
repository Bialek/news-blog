import React from "react";

export default function ArticleMiniature(props) {
  console.log(props);
  return (
    <div
      className={`tile is-parent ${
        props.article.miniatureIsVertical ? "is-vertical" : ""
      } ${
        props.article.miniatureSize ? `is-${props.article.miniatureSize}` : ""
      } `}
    >
      <article
        className={`tile is-child box ${
          props.article.miniatureColor
            ? `notification ${props.article.miniatureColor}`
            : ""
        }`}
      >
        <p className="title">{props.article.title}</p>
        <p className="subtitle">{props.article.header}</p>
        {props.article.img && (
          <figure className="image is-4by3">
            <img src={props.article.img} alt={props.article.title} />
          </figure>
        )}
        {props.article.miniatureContent && (
          <div className="content">{props.article.miniatureContent}</div>
        )}
      </article>
    </div>
  );
}
