import { BASE_URL, STORAGE_TOKEN_KEY } from "utils/constants";

class NewsService {
  getAll() {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/news/getAll`, {
        headers: { "x-access-token": localStorage.getItem(STORAGE_TOKEN_KEY) },
      })
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

  getById(id) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/news/getById/${id}`)
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
      fetch(`${BASE_URL}/news/add`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (response.status === 200) {
            resolve();
          } else {
            reject();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/news/remove/${id}`, {
        method: "delete",
      })
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
}

export default new NewsService();
