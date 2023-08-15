const allArticlesById = require('../models/articles.models')

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
   
    
    


module.exports = getArticlesById