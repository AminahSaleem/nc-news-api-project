const {fetchUserByUsername} = require("../models/users.models")
  
  
  exports.getUserByUsername = (request, response, next) => {
    const { username } = request.params;
    fetchUserByUsername(username)
      .then((user) => {
        response.status(200).send({ user: user });
      })
      .catch((err) => {
        next(err);
      });
  };