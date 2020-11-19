import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/loader";
import NewsService from "services/news/index";
import CommentsList from "components/comments-list";

export default function SingleArticle() {
  let { articleId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    NewsService.getById(articleId)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }, [articleId]);

  return (
    <div className="container mt-3">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {data && (
        <>
          <section className="is-large">
            <h4 className="title">{data.title}</h4>
            <h5 className="subtitle">{data.header}</h5>
            <div className="content">
              <p>Author: {data.author}</p>
            </div>
            <div className="columns is-multiline is-mobile">
              <div className="column">{data.content}</div>
              {data.img && (
                <div className="column is-one-quarter">
                  <figure className="image is-128x128">
                    <img src={data.img} alt={data.title} />
                  </figure>
                </div>
              )}
            </div>
          </section>

          <CommentsList articleId={articleId} />
        </>
      )}
    </div>
  );
}
