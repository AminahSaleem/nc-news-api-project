const { allTopics, allArticles } = require('../models/models')
const {topicData } = require('../test-data/index')

const getTopics = (request, response, next) => {
    allTopics(topicData).then((topicsData) => {
        response.status(200).send({topics: topicsData})
    })
    .catch((err) => {
        next(err)
    })
}



module.exports = {getTopics}