const express = require("express")
const {getTopics } = require('./controllers/controller')
const app = express()


app.get("/api/topics", getTopics)



app.use((err, request, response, next) => {
    if (err.status && error.msg) {
      response.status(error.status).send({ msg: error.msg})
    } else {
      next(error);
    }
  }) 

  app.use((err, request, response, next) => {
    response.status(500).send({ msg: "error!" });
  });

module.exports = app