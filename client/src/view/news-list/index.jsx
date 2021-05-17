import React, { useEffect, useState, useMemo } from "react";
import NewsService from "services/news/index";

import Loader from "components/loader";
import NewsMiniature from "components/news-miniature";
import { useParams } from "react-router";

export default function NewsList() {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    NewsService.getAllNewest(categoryId)
      .then((response) => {
        setCollection(response);
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  const renderedArticles = useMemo(() => {
    if (collection) {
      const groupedCollection = collection.reduce((res, el, i) => {
        if (i % 3 === 0) {
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

  return (
    <div className="container mt-3">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {collection && renderedArticles}
    </div>
  );
}
