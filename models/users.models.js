const db = require("../db/connection");

exports.fetchUserByUsername = (username) => {
  if (!username) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else {
    const text = "SELECT * FROM users WHERE username = $1";
    const params = [username];
    return db.query(text, params).then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Username doesn't exist" });
      }
      console.log(rows)
      return rows[0];
    });
  }
};