import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/loader";
import NewsService from "services/news/index";
import CommentsList from "components/comments-list";
import draftToHtml from "draftjs-to-html";

export default function SingleNews() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState();

  useEffect(() => {
    if (data === null) {
      NewsService.getById(id)
        .then((response) => {
          setData(response);

          if (response.content) {
            const parserContent = draftToHtml(JSON.parse(response.content));
            setContent(parserContent);
          }
        })
        .catch((error) => {
          setError(`Error ${error.status} ${error.statusText}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, data]);

  return (
    <div className="container mt-3">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {data && (
        <>
          <section className="is-large">
            <h4 className="title">{data.title}</h4>
            <h5 className="subtitle">{data.subtitle}</h5>
            <div className="content">
              <p>Author: {data.authorName}</p>
            </div>
            <div className="columns is-multiline is-mobile">
              {content && (
                <div
                  className="column"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )}

              {data.img && (
                <div className="column is-one-quarter">
                  <figure className="image is-128x128">
                    <img src={data.img} alt={data.title} />
                  </figure>
                </div>
              )}
            </div>
          </section>

          <CommentsList newsId={id} />
        </>
      )}
    </div>
  );
}
