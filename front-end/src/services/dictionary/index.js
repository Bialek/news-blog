import { BASE_URL } from "utils/constants";

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
}

export default new DictionaryService();
