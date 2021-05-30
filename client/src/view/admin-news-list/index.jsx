import React, { useEffect, useState } from "react";
import NewsService from "services/news/index";
import Loader from "components/loader";
import "./styles.scss";
import { useHistory } from "react-router";

export default function AdminNewsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);
  let history = useHistory();

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

  function onClickPublishHandler(articleId) {
    setIsLoading(true);
    NewsService.publish(articleId)
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="container mt-3">
      <div>
        <div className="container">
          <h1 className="title">News list</h1>
          <button
            className="button news-list__add-btn"
            onClick={() => history.push("/admin/add-news")}
          >
            Add article
            <i className="fas fa-plus"></i>
          </button>
          {isLoading && <Loader />}
          {error && !isLoading && <div>{error}</div>}
          {collection && !isLoading && (
            <div className="news-list">
              {collection.map((news) => (
                <div className="news-list__row" key={news.id}>
                  <div className="news-list__row--text">{news.title}</div>
                  <div className="news-list__row--text">{news.subtitle}</div>
                  <div className="news-list__row--text">
                    {news.published === true ? "Published" : "Not published"}
                  </div>

                  <div
                    className="news-list__table-btn"
                    onClick={() => history.push(`/admin/edit-news/${news.id}`)}
                  >
                    <i className="fas fa-edit"></i>
                  </div>
                  <div
                    className="news-list__table-btn"
                    onClick={() => onClickDeleteHandler(news.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </div>
                  {news.published === false && (
                    <div
                      className="news-list__table-btn"
                      onClick={() => onClickPublishHandler(news.id)}
                    >
                      <i className="far fa-newspaper"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
