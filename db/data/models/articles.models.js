const connection = require('../../connection')

const allArticlesById = (article_id) => {
    return connection.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        return rows[0] 
    })
}

module.exports = allArticlesById
