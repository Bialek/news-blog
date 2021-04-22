import React, { useEffect, useState } from "react";
import NewsService from "services/news/index";
import NewsForm from "components/news-form";
import Loader from "components/loader";
import { useParams } from "react-router";

export default function AdminEditNews() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    NewsService.getByIdForEdit(id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="container mt-3 px-3">
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {data && <NewsForm request={NewsService.update} formData={data} />}
    </div>
  );
}
