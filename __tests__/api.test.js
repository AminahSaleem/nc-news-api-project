const data = require('../db/data/test-data')
const connection = require('../db/connection')
const app = require('../db/data/app')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const jsonEndpoints = require('../endpoints.json')

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

    });
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
            expect(article.article_id).toEqual(1)
        })
    })
    test('GET 404: should respond with an error if the article is not found', () => {
        return request(app).get("/api/articles/999").expect(404)
        .then(({body}) => {
            const {msg} = body
            expect(msg).toBe("Not Found")
        })
    })
})