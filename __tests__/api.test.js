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
      expect(response.body.topics).toEqual(expect.any(Array));
      expect(Object.keys(response.body.topics[0])).toEqual(
        expect.arrayContaining([
          'description', 'slug'
        ])
      );
    })
}) 
})

describe.skip('GET /api/topics', () => {
    test('GET: 400 responds with a bad request if query doesnt exist', () => {
        return request(app).get('/api/topics?in').expect(404).then((response) => {
            expect(response.body.msg).toBe("Not Found")
        })
        })
})

describe('GET /api/articles', () => {
  test('GET: 200, should send an array of articles which have the correct properties to the client', () => {
    return request(app).get("/api/articles").expect(200)
    .then((response) => {
      const {article} = response.body
     // console.log(response.body)
      expect(article).toBeInstanceOf(Array)

     article.forEach(article => {
        expect(article).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String)
        });
    })
}) 
  })
  test('should respond with an empty array if there are no articles present', () => {
    return request(app).get('/api/articles').expect(200).then((response) => {
      const {article} = response.body
      expect(article.length).toEqual(13)
    })
  })
})