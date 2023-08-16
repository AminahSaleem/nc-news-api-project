const express = require("express")
const {getTopics, getEndpoints } = require('./controllers/controller')
const getArticlesById = require('../../db/data/controllers/article.controller')
const app = express()
app.use(express.json())


app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticlesById)

app.use((err, request, response, next) => {
    if (err.status && err.msg) {
      response.status(err.status).send({ msg: err.msg})
    } else {
      next(err);
    }
  }) 
  app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Bad Request' });
    } else res.status(500).send({ msg: 'Internal Server Error' });
  }) 


module.exports = app