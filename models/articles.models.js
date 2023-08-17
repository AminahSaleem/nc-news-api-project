const connection = require('../db/connection')

const allArticlesById = (article_id) => {
    return connection.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status:404, msg: 'Not Found'})
        }
        return rows[0] 
    })
    }
   
const allArticles = () => {
    return connection.query(`SELECT articles.author, articles.title,articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.*) AS comment_count 
    FROM articles 
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at desc`)
    .then(({rows}) => {
        return rows 
    })
}

const fetchArticleComments = (article_id) => {
    return allArticlesById(article_id).then(()=>{
         return connection.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
    })
    .then(({rows}) => {
        return rows
    })
}

const updateArticles = (article_id, inc_votes) =>{
    return allArticlesById(article_id).then(()=>{
    return connection.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`, [inc_votes, article_id])
    .then(({rows}) => {
        return rows[0]
    })
})
}

module.exports = {allArticlesById, allArticles, fetchArticleComments, updateArticles}
     
