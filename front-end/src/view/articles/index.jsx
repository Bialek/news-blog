import React, { useEffect, useState, useMemo } from "react";
import NewsService from "services/news/index";

import Loader from "components/loader";
import ArticleMiniature from "components/article-miniature";

export default function Articles() {
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    NewsService.getAll()
      .then((response) => {
        setCollection(response);
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const renderedArticles = useMemo(() => {
    if (collection) {
      const grouped = collection.reduce((res, el, i) => {
        if (i % 3 === 0) {
          res[res.length] = [el];
        } else {
          res[res.length - 1] = [...res[res.length - 1], el];
        }
        return res;
      }, []);

      console.log(grouped);

      return grouped.map((grouped) => (
        <div key={`group-${grouped[0].id}`} className="tile is-ancestor">
          {grouped.map((article) => (
            <ArticleMiniature
              key={`${article.id}-${article.title}`}
              article={article}
            />
          ))}
        </div>
      ));
    } else {
      return <div>Nothing to show</div>;
    }
  }, [collection]);

  return (
    <div className="container mt-3">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {collection && renderedArticles}
      <div className="tile is-ancestor"></div>
    </div>
  );
}
