class NewsService {
  getAll() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8088/news/list")
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

  get(id) {}

  // create(payload) {
  //   return new Promise((resolve, reject) => {
  //     // We create a new form
  //     var formData = new FormData();

  //     // we add all object items to the new form
  //     forEach(object, (value, key) => {
  //       formData.append(key, value);
  //     });

  //     // We fetch Post the API
  //     fetch('https://httpbin.org/post', {
  //       method: 'post',
  //       body: formData
  //     }).then((response) => {
  //       if (response.status !== 200) {
  //         // Not success
  //         resolve(response.text());
  //       } else {
  //         // Success
  //         resolve(response.text());
  //       }
  //     }).catch(err => {
  //       // Service Error
  //       reject(err);
  //     });
  // }

  update(payload) {}

  delete(id) {}
}

export default new NewsService();
