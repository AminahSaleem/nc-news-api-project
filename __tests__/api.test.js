const data = require('../db/data/test-data')
const connection = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const jsonEndpoints = require('../endpoints.json')
const { toLocaleString } = require('../db/data/test-data/users')

afterAll(() => connection.end());

beforeEach(() => seed(data));

describe('GET /api/topics', () => {
    test('GET: 200 should send an array of topics with the properties of dexcription and slug to the client', () => {
     return request(app).get("/api/topics").expect(200)
    .then((response) => {
        const {topics}= response.body
        expect(topics).toBeInstanceOf(Array)
        topics.forEach(topic => {
            expect(topic).toMatchObject({
                description: expect.any(String),
                slug: expect.any(String)
            })
        })

    })
    })
}) 
describe('GET /api', () => {
    test('GET: 200 should respond with the documentation of endpoints', () => {
        return request(app).get("/api").expect(200)
        .then((response) => {
            const endpoints = response.body
            expect(endpoints).toEqual(jsonEndpoints)
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    test('GET 200: should respond with the articles id', () => {
        return request(app).get('/api/articles/1').expect(200)
        .then((response) => {
            const article = response.body.article
            expect(article).toEqual({
                article_id: 1, 
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 100,
                article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            })
            

            })
        })
    test('GET 404: should respond with an error if the article is not found', () => {
        return request(app).get("/api/articles/999").expect(404)
        .then(({body}) => {
            const {msg} = body
            expect(msg).toBe("Not Found")
        })
    })
    test('GET 400: should respond with an error if the article_id is not a number', () => {
        return request(app).get('/api/articles/mystery').expect(400)
        .then(({body}) => {
            const {msg} = body
            expect(msg).toBe('Bad Request')
        })
    })
})

describe('GET /api/articles', () => {
    test('GET 200: should return an array of articles', () => {
        return request(app).get("/api/articles").expect(200)
        .then((response) => {
            const {articles} = response.body
            expect(articles).toBeInstanceOf(Array)
            articles.forEach(article => {
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)
            })
        })
    })
  })
  test('GET 200: the article should be sorted by date in descending order', () => {
    return request(app).get("/api/articles").expect(200)
    .then(({body})=> {
        const articles = body.articles
        expect(articles).toBeSortedBy("created_at", {descending:true})
    })
  })
   test('GET 200: the article should not return the body property on the article objects', () => {
    return request(app).get("/api/articles").expect(200)
    .then(({body}) => {
        const articles = body.articles
        articles.forEach((article) => {
            expect(article).not.toHaveProperty('body')
})
    })
})
})

describe('GET /api/articles/:article_id/comments', () => {
    test('GET: 200 responds with the correct keys', () => {
        return request(app).get(`/api/articles/1/comments`).expect(200)
        .then(({body})=> {
            const {comments} = body
            expect(comments).toBeInstanceOf(Object)
            comments.forEach(comment => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number) }) 
                })
                })
            })
        test('GET: 200 should respond with all comments with the most recent comments first', () =>{
            return request(app).get("/api/articles/1/comments").expect(200)
            .then(({body})=>{
                const {comments} = body
                expect(comments).toHaveLength(11)
                expect(comments).toBeSortedBy("created_at", {descending:true})

            })
        })
        test('GET: 404 responds with an error for invalid article_id', () => {
            return request(app).get("/api/articles/999/comments").expect(404)
            .then(({body})=>{
                const {msg} = body
                expect(msg).toEqual("Not Found")
            })
        })
        test('GET: 400 responds with a bad request error if there is no article_id', () => {
            return request(app).get("/api/articles/mystery/comments").expect(400)
            .then(({body})=>{
                const {msg} = body
                expect(msg).toEqual("Bad Request")
            })
        })
        test('GET 200: should respond with an empty array for an article that does exist but no comments', () => {
            return request(app).get("/api/articles/13/comments").expect(200)
            .then(({body})=>{
                const {comments} = body
                expect(comments).toEqual([])
            })
        })
        })
 
describe('POST /api/articles/:articles_id/comments', () => {
    test('POST 201: should respond with an added comment to the article', () => {
            const addedComment = {
                    username: "butter_bridge",
                    body: "Test comment"
                };
            return request(app).post("/api/articles/1/comments").send(addedComment).expect(201)
            .then(({body}) => {
                const {comment} = body
                expect(comment).toMatchObject({
                        author: "butter_bridge",
                        body: "Test comment",
                        comment_id: expect.any(Number)
                    })
                })
            })
        test('POST 400: should return bad request if there is a missing field', ()=>{
            const newComment = {
                body: 'Missing field'
            }
            return request(app).post("/api/articles/1/comments").send(newComment).expect(400)
            .then(({body}) => {
                const {msg} = body
                expect(msg).toEqual('Bad Request')
            })
        })
        test('POST 201: should respond with a 201 when sending extra properties', () => {
            const newComment = {
                username: "butter_bridge",
                body: 'Test comment',
                extra: 'extra'
            }
            return request(app).post("/api/articles/1/comments").send(newComment).expect(201)
            .then(({body})=>{
                const {comment} = body
                expect(comment).toMatchObject({
                author: "butter_bridge",
                body: 'Test comment'
                })
            })
        })
        test('POST 400: should respond with an error if the username does not exist', () => {
            const newComment = {
                username: 'Aminah',
                body: 'Test'
            }
            return request(app).post('/api/articles/1/comments').send(newComment).expect(400)
            .then(({body})=>{
                const {msg} = body
                expect(msg).toEqual('Bad Request')
            })
        })
        test('POST 404: should respond with an error if the article_id is valid but doesnt exist', () => {
            const newComment = {
                username: "butter_bridge",
                body: 'Test'
            }
            return request(app).post("/api/articles/999/comments").send(newComment).expect(404)
            .then(({body}) => {
                const {msg} = body
                expect(msg).toEqual('Not Found')
            })
        })
        })

describe('DELETE /api/comments/:comment_id', () => {
    test('DELETE 204: should delete the given comment by comment_id', () => {
        return request(app).delete('/api/comments/1').expect(204).then(() =>{
            return request(app).get('/api/comments/1').expect(404)
        })
       
    })
})