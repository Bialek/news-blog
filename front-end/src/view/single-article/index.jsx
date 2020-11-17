import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/loader";
import NewsService from "services/news/index";

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
        <section>
          <h4 class="title">{data.title}</h4>
          <h5 class="subtitle">{data.header}</h5>
          <div class="columns is-multiline is-mobile">
            <div class="column">{data.content}</div>
            {data.img && (
              <div class="column is-one-quarter">
                <figure class="image is-128x128">
                  <img src={data.img} alt={data.title} />
                </figure>
              </div>
            )}
          </div>
          <footer class="footer">
            <div class="content">
              <p>Author: {data.author}</p>
            </div>
          </footer>
        </section>
      )}
    </div>
  );
}
