import React, { useState, useEffect, useRef } from "react";
import Loader from "components/loader";
import CommentService from "services/comment/index";

export default function CommentsList({ newsId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data === null) {
      CommentService.getAll(newsId)
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          setError(`Error ${error.status} ${error.statusText}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [newsId, data]);

  const newCommentInput = useRef();

  function onClickHandler() {
    if (newCommentInput.current.value !== "") {
      CommentService.create({
        content: newCommentInput.current.value,
        newsId: parseInt(newsId),
      })
        .then(() => {
          setIsLoading(true);
          setData(null);
        })
        .catch((error) => {
          setError(`Error ${error.status} ${error.statusText}`);
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <div className="container mt-3">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {data && (
        <section className="is-large">
          {data.map((comment) => (
            <article className="media" key={comment.id}>
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="https://via.placeholder.com/128x128" alt="author" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{comment.author}</strong>
                    <br />
                    {comment.content}
                    <br />
                  </p>
                </div>
              </div>
            </article>
          ))}

          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src="https://via.placeholder.com//128x128" alt="user" />
              </p>
            </figure>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    placeholder="Add a comment..."
                    ref={newCommentInput}
                  ></textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button" onClick={onClickHandler}>
                    Post comment
                  </button>
                </p>
              </div>
            </div>
          </article>
        </section>
      )}
    </div>
  );
}
