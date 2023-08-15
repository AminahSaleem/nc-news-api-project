const connection = require('../../connection')


const allTopics = () => {
  
    return connection.query('SELECT * FROM topics').then(({rows}) => {
        return rows 
    })
}


module.exports = { allTopics }