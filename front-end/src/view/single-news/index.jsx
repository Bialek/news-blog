import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/loader";
import NewsService from "services/news/index";
import CommentsList from "components/comments-list";
import DOMPurify from "dompurify";
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";

export default function SingleNews() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState();

  useEffect(() => {
    NewsService.getById(id)
      .then(async (response) => {
        if (response.content) {
          const parserContent = await convertToHTML(
            convertFromRaw(JSON.parse(response.content))
          );
          setContent(parserContent);
        }
        setData(response);
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

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
              <div
                className="column"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              ></div>
              {data.img && (
                <div className="column is-one-quarter">
                  <figure className="image is-128x128">
                    <img src={data.img} alt={data.title} />
                  </figure>
                </div>
              )}
            </div>
          </section>

          <CommentsList articleId={id} />
        </>
      )}
    </div>
  );
}
