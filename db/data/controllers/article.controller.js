const allArticlesById = require('../models/articles.models')

const getArticlesById = (request, response, next) => {
    const {article_id} = request.params
         allArticlesById(article_id).then((article) => {
            response.status(200).send({article: article}) 
          }).catch((err) => {
            next(err)
          })
        }
   
    
    


module.exports = getArticlesById