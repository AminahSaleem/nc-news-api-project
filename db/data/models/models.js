const connection = require('../../connection')


const allTopics = (topicData) => {
    if (!topicData){
    return Promise.reject({status: 400, msg: 'Bad request'})
    } 
    return connection.query('SELECT * FROM topics').then(({rows}) => {
        return rows 
    })
}

const allArticles = (articleData) => {
    return connection.query('SELECT * FROM articles').then(({rows}) => {
        return rows
    }) 
} 


module.exports = { allTopics, allArticles }