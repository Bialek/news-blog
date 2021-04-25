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
      fetch(`${BASE_URL}/api/news/getById/${id}`, {
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

  getByIdForEdit(id) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/news/getByIdForEdit/${id}`, {
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

  create(payload) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/news/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem(STORAGE_TOKEN_KEY),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.status === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  update(payload) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/news/edit`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem(STORAGE_TOKEN_KEY),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.status === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/news/remove/${id}`, {
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

  publish(id) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/news/publish/${id}`, {
        method: "put",
        headers: {
          "x-access-token": localStorage.getItem(STORAGE_TOKEN_KEY),
        },
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

  getAllNewest(categoryId) {
    let url = `${BASE_URL}/api/news/getAllNewest`;
    if (categoryId) {
      url = url.concat(`/${categoryId}`);
    }

    return new Promise((resolve, reject) => {
      fetch(url)
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
