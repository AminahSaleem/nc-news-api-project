const {allArticlesById, allArticles, fetchArticleComments, updateArticles} = require('../models/articles.models')

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

    const patchArticles = (request, response, next) =>{
        const {article_id} = request.params
        const {inc_votes} = request.body
        updateArticles(article_id, inc_votes).then((updatedArticle) =>{
            response.status(200).send({articles: updatedArticle})
        }).catch((err) => {
            next(err)
        })
    }

module.exports = {getArticlesById, getArticles, getArticleComments, patchArticles }