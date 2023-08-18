const express = require("express")
const {getTopics, getEndpoints } = require('./controllers/controller')

const {getArticles, getArticlesById, getArticleComments, patchArticles, addComments, deleteComments, getUsers} = require('./controllers/article.controller')

const app = express()
app.use(express.json())


app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticlesById)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", addComments)

app.delete("/api/comments/:comment_id", deleteComments)

app.patch("/api/articles/:article_id", patchArticles)

app.get("/api/users", getUsers)

app.use((err, request, response, next) => {
    if (err.status && err.msg) {
      response.status(err.status).send({ msg: err.msg})
    } else {
      next(err);
    }
  }) 
  app.use((err, req, res, next) => {
    if (err.code === '22P02' || '23503') {
      res.status(400).send({ msg: 'Bad Request' });
    } else res.status(500).send({ msg: 'Internal Server Error' });
  }) 


module.exports = app