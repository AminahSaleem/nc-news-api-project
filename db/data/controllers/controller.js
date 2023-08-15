const { allTopics } = require('../models/models')


const getTopics = (request, response, next) => {
    allTopics().then((topicsData) => {
        response.status(200).send({topics: topicsData})
    })
    .catch((err) => {
        next(err)
    })
}



module.exports = {getTopics}