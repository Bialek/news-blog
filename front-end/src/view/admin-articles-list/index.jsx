import React, { useEffect, useState } from "react";
import NewsService from "services/news/index";
import Loader from "components/loader";
import "./styles.scss";

export default function AdminArticlesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (collection === null) {
      setIsLoading(true);
      NewsService.getAll()
        .then((response) => {
          setCollection(response);
        })
        .catch((error) => {
          setError(`Error ${error.status} ${error.statusText}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [collection]);

  function onClickDeleteHandler(articleId) {
    setIsLoading(true);
    NewsService.delete(articleId)
      .then(() => {
        setCollection(null);
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      });
  }

  return (
    <div className="container mt-3">
      <div>
        <div className="container">
          <h1 className="title">Articles list</h1>
          {isLoading && <Loader />}
          {error && !isLoading && <div>{error}</div>}
          {collection && !isLoading && (
            <div className="articles-list">
              {collection.map((acticle) => (
                <div className="articles-list__row" key={acticle.id}>
                  <div>{acticle.title}</div>
                  <div>{acticle.author}</div>
                  <div
                    className="articles-list__remove-btn"
                    onClick={() => onClickDeleteHandler(acticle.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
