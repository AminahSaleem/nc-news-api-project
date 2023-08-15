const express = require("express")
const {getTopics, getEndpoints } = require('./controllers/controller')
const getArticlesById = require('../../db/data/controllers/article.controller')
const app = express()


app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticlesById)

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