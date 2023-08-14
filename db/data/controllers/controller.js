const { allTopics, allArticles } = require('../models/models')
const {topicData, articleData } = require('../test-data/index')

const getTopics = (request, response, next) => {
    allTopics(topicData).then((topicsData) => {
        response.status(200).send({topics: topicsData})
    })
    .catch((err) => {
        next(err)
    })
}

const getArticles = (request, response, next) => {
    allArticles(articleData).then((articleData) => {
        response.status(200).send({article: articleData})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getTopics, getArticles}