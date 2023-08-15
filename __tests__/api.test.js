const data = require('../db/data/test-data')
const connection = require('../db/connection')
const app = require('../db/data/app')
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

describe.only('GET /api/articles', () => {
    test('GET 200: should return an array of articles', () => {
        return request(app).get("/api/articles").expect(200)
        .then((response) => {
            const {article} = response.body
            expect(article).toBeInstanceOf(Array)
            article.forEach(articles => {
                expect(articles).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
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
    .then((response)=> {
        const {article} = response.body

    })
  })
})