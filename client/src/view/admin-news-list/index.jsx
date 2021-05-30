import React, { useContext, useEffect, useMemo, useState } from "react";
import NewsService from "services/news/index";
import Loader from "components/loader";
import "./styles.scss";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "context";
import { useDebouncedCallback } from "use-debounce/lib";

export default function AdminNewsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { categoryId } = useParams();
  const location = useLocation();
  const { storeData } = useContext(StoreContext);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    setIsLoading(true);
    NewsService.getAll({
      query,
      categoryId,
    })
      .then((response) => {
        setCollection(response);
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }, [query, categoryId]);

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

  const categoriesOptions = useMemo(
    () => (
      <>
        <option value="">Select category</option>
        {storeData &&
          storeData.dictionaryData &&
          storeData.dictionaryData["news_category"] &&
          storeData.dictionaryData["news_category"].map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </>
    ),
    [storeData]
  );

  const onChangeQueryHandler = useDebouncedCallback((query) => {
    let url = location.pathname;
    if (query !== "") {
      url = `${url}?query=${query}`;
    }
    history.push(url);
  }, 200);

  return (
    <div className="container mt-3">
      <div>
        <div className="container">
          <h1 className="title">News list</h1>
          <div className="search">
            <button
              className="button news-list__add-btn"
              onClick={() => history.push("/admin/add-news")}
            >
              Add article
              <i className="fas fa-plus"></i>
            </button>
            <div className="field">
              <label className="label">Search</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  defaultValue={query}
                  onChange={(event) => {
                    onChangeQueryHandler(event.target.value);
                  }}
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Category</label>
              <div class="control">
                <div class="select">
                  <select
                    value={categoryId}
                    onChange={(event) => {
                      let url = `/admin/news-list/${event.target.value ?? ""}`;
                      if (query && query !== "") {
                        url = `${url}?query=${query}`;
                      }
                      history.push(url);
                    }}
                  >
                    {categoriesOptions}
                  </select>
                </div>
              </div>
            </div>
          </div>
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
