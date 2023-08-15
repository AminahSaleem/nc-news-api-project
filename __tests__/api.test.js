const data = require('../db/data/test-data')
const connection = require('../db/connection')
const app = require('../db/data/app')
const request = require('supertest')
const seed = require('../db/seeds/seed')

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


  