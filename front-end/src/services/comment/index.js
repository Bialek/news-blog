class CommentService {
  getAll(articleId) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8088/news/commentsList/${articleId}`)
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
      fetch("http://localhost:8088/comments/add", {
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
