const {allArticlesById, allArticles, fetchArticleComments, postComments, deletedByCommentId, checkCommentExists} = require('../models/articles.models')

const getArticlesById = (request, response, next) => {
    const article_id = parseInt(request.params.article_id)
    console.log(request.params)
         allArticlesById(article_id).then((article) => {
        response.status(200).send({article: article})
    }).catch((err) => {
        next(err)
    })    
    }
   
    const getArticles = (request, response) => {
        allArticles().then((articleData) => {
            response.status(200).send({articles: articleData})
        })
    }

    const getArticleComments = (request, response, next) =>{
        const {article_id} = request.params
        fetchArticleComments(article_id).then((comments) => {
            response.status(200).send({comments:comments})
        }).catch((err)=>{
            next(err)
        })
        }

    const addComments = (request, response, next ) => {
        const { article_id } = request.params
        const { username, body } = request.body
        postComments({article_id, username, body})
        .then((comment)=> {
            response.status(201).send({ comment })
        }).catch((err) => {
            next(err)
            })
        }
    const deleteComments = (request, response, next) => {
        const {comment_id} = request.params
        checkCommentExists(comment_id).then(() => {
            return deletedByCommentId(comment_id)
        }).then(() => {
            response.sendStatus(204)
        }).catch((err) => {
            next(err)
        }) 
        }

module.exports = {getArticlesById, getArticles, getArticleComments, addComments, deleteComments }