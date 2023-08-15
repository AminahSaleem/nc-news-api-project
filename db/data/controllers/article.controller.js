const {allArticlesById, allArticles} = require('../models/articles.models')

const getArticlesById = (request, response) => {
    const article_id = parseInt(request.params.article_id)
    console.log(request.params)
         allArticlesById(article_id).then((article) => {
            if(!article) {
                return response.status(404).send({msg: 'Not Found'})
            }
        response.status(200).send({article: article})
    })    
    }
   
    const getArticle = (request, response) => {
        allArticles().then((articleData) => {
            response.status(200).send({article: articleData})
        })
    }
    


module.exports = {getArticlesById, getArticle }