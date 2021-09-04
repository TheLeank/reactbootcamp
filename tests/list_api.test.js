const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Jacobo Rodriguez',
    likes: 0,
    url: 'first-blog'
  },
  {
    title: 'Second blog',
    author: 'Jacobo Rodriguez',
    likes: 2,
    url: 'second-blog'
  },
  {
    title: 'Third blog',
    author: 'Jacobo Rodriguez',
    likes: 7,
    url: 'third-blog'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('3 blogs are returned in JSON', async () => {
  const response = await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(3)
})

afterAll(() => {
  mongoose.connection.close()
})