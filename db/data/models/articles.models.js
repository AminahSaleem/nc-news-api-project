const connection = require('../../connection')

const allArticlesById = (article_id) => {
    return connection.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        return rows[0] 
    })
}

const allArticles = () => {
    return connection.query('SELECT * FROM articles ORDER BY created_at DESC')
    .then(({rows}) => {
        return rows 
    })
}

module.exports = {allArticlesById, allArticles }
