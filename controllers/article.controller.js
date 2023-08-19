
const {allArticlesById, allArticles, fetchArticleComments, postComments,updateArticles, deletedByCommentId, checkCommentExists, fetchUsers} = require('../models/articles.models')


const getArticlesById = (request, response, next) => {
    const article_id = parseInt(request.params.article_id)
    console.log(request.params)
         allArticlesById(article_id).then((article) => {
        response.status(200).send({article: article})
    }).catch((err) => {
        next(err)
    })    
    }
   
    const getArticles = (request, response, next) => {
        const {topic, sort_by, order} = request.query
        allArticles(topic, sort_by, order).then((articleData) => {
            response.status(200).send({articles: articleData})
        }).catch((err) => 
        next(err))
    }

    const getArticleComments = (request, response, next) =>{
        const {article_id} = request.params
        fetchArticleComments(article_id).then((comments) => {
            response.status(200).send({comments:comments})
        }).catch((err)=>{
            next(err)
        })
        }


    const patchArticles = (request, response, next) =>{
        const {article_id} = request.params
        const {inc_votes} = request.body
        updateArticles(article_id, inc_votes).then((updatedArticle) =>{
            response.status(200).send({articles: updatedArticle})
        }).catch((err) => {
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

    const getUsers = (request, response, next) => {
         fetchUsers().then((users) => {
            response.status(200).send({users: users})
        }).catch((err) => {
               next(err)
        })    
        }


module.exports = {getArticlesById, getArticles, getArticleComments, addComments, deleteComments, patchArticles, getUsers}


