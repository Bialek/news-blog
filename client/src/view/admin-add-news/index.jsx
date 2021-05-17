import React from "react";
import NewsService from "services/news/index";
import NewsForm from "components/news-form";

export default function AdminAddNews() {
  return (
    <div className="container mt-3 px-3">
      <NewsForm request={NewsService.create} />
    </div>
  );
}
