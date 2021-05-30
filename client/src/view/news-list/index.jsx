import React, { useEffect, useState, useMemo, useContext } from "react";
import NewsService from "services/news/index";

import Loader from "components/loader";
import NewsMiniature from "components/news-miniature";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "context";
import { useDebouncedCallback } from "use-debounce";

export default function NewsList() {
  const { categoryId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);
  const { storeData } = useContext(StoreContext);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    setIsLoading(true);
    NewsService.getAllNewest({
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

  const renderedArticles = useMemo(() => {
    if (collection) {
      const groupedCollection = collection.reduce((res, el, i) => {
        if (i % 4 === 0) {
          res[res.length] = [el];
        } else {
          res[res.length - 1] = [...res[res.length - 1], el];
        }
        return res;
      }, []);
      return groupedCollection.map((groupedNews) => {
        const gridTemplate = groupedNews.reduce(
          (string, news) => string.concat(` ${news.miniatureSize ?? 3}fr`),
          ""
        );
        return (
          <div
            key={`group-${groupedNews[0].newsId}`}
            style={{
              gridTemplateColumns: `${gridTemplate}`,
              display: "grid",
            }}
          >
            {groupedNews.map((news) => (
              <NewsMiniature
                key={`${news.newsId}-${news.miniatureTitle}`}
                news={news}
              />
            ))}
          </div>
        );
      });
    } else {
      return <div>Nothing to show</div>;
    }
  }, [collection]);

  const categoriesOptions = useMemo(
    () => (
      <>
        <option disabled selected value>
          Select category
        </option>
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
      <div className="search">
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
                  let url = `/news-list/${event.target.value}`;
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
      {error && <div>{error}</div>}
      {collection && <div>{renderedArticles}</div>}
    </div>
  );
}
