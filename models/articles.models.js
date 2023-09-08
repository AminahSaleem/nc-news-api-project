const connection = require('../db/connection')

const allArticlesById = (article_id) => {
    return connection
    .query(`SELECT articles.*, (SELECT COUNT(comment_id) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count
      FROM articles
      WHERE articles.article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      }
      return rows[0];
    });
};
   

    const allArticles = (topic, sort_by = "created_at", order = "desc" ) => {
        const acceptedSorts = ["title", "topic", "author", "body", "created_at", "votes", "comment_count"]
        const acceptedOrder = ["asc", "desc"]

        if(!acceptedSorts.includes(sort_by)){
            return Promise.reject({status:400, msg: "Bad Request"})
        }
        if(!acceptedOrder.includes(order)) {
            return Promise.reject({status:400, msg: "Bad Request"})
        }

        let query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.*) AS comment_count 
                     FROM articles 
                     LEFT JOIN comments
                     ON articles.article_id = comments.article_id`;
    
        if (topic) {
            query += ` WHERE articles.topic = '${topic}'`;
        }
    
        query += ` GROUP BY articles.article_id
                   ORDER BY ${sort_by} ${order}`;
    
        return connection.query(query)
            .then((result) => {
                if (result.rows.length === 0) {
                  return Promise.reject({ status: 404, msg: "Not Found" });
                } else {
                  return result.rows;
                }
            });
    };

const fetchArticleComments = (article_id) => {
    return allArticlesById(article_id).then(()=>{
         return connection.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
    })
    .then(({rows}) => {
        return rows
    })
}
const postComments = ({ article_id, username, body }) => {
    return allArticlesById(article_id).then(()=> {
        return connection.query(`INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
    [article_id, username, body]
    ).then(({rows}) => {
        return rows[0];
    }) 
    }) 
}


const checkCommentExists = (comment_id) => {
    return connection.query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status:404, msg: 'Not Found'})
        }
    })
    }
const deletedByCommentId = (comment_id) => {
    return connection.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
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

const fetchUsers = () => {
    return connection.query(`SELECT * FROM users`)
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status:404, msg: 'Not Found'})
        }
        return rows
    })
    }

module.exports = {allArticlesById, allArticles, fetchArticleComments, postComments, updateArticles, deletedByCommentId, checkCommentExists, fetchUsers}




     

