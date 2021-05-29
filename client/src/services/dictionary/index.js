import { BASE_URL, STORAGE_TOKEN_KEY } from "utils/constants";

class DictionaryService {
  getAll() {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/dictionary/getAll`)
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
      fetch(`${BASE_URL}/api/dictionary/create`, {
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
      fetch(`${BASE_URL}/api/dictionary/edit`, {
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
      fetch(`${BASE_URL}/api/dictionary/delete/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
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
}

export default new DictionaryService();
