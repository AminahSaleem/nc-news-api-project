const connection = require('../../connection')

const allArticlesById = (article_id) => {
    return connection.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        return rows[0] 
    })
}

const allArticles = () => {
    return connection.query('SELECT articles.author, articles.title,articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, (comments.comment_count, 0) AS comment_count FROM articles LEFT JOIN (SELECT article_id, COUNT(*) AS comment_count FROM comments GROUP BY article_id) AS comments ON articles.article_id = comments.article_id ORDER BY articles.created_at DESC')
    .then(({rows}) => {
        return rows 
    })
}



module.exports = {allArticlesById, allArticles }
