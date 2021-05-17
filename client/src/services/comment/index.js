import { BASE_URL } from "utils/constants";

class CommentService {
  getAll(newsId) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/comment/getAllForNews/${newsId}`)
        .then(async (response) => {
          if (response.status !== 200) {
            reject(response);
          } else {
            resolve(await response.json());
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  create(payload) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/comment/create/${payload.newsId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.status !== 200) {
            resolve(response.text());
          } else {
            resolve(response.text());
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new CommentService();
