class UserService {
  logIn(payload) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8088/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (response.status === 200) {
            resolve(await response.json());
          } else {
            reject(await response.json());
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new UserService();
