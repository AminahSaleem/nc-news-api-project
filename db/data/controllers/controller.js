const { allTopics } = require('../models/models')
const endpointsData = require('../../../endpoints.json')

const getTopics = (request, response, next) => {
    allTopics().then((topicsData) => {
        response.status(200).send({topics: topicsData})
    })
    .catch((err) => {
        next(err)
    })
}

const getEndpoints = (request, response) => {
    response.status(200).send(endpointsData)
}

module.exports = {getTopics, getEndpoints}