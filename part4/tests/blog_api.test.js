const mongoose = require('mongoose')
const supertest = require('supertest')
const { all } = require('../app')
const app = require('../app')
const Blog = require('../models/blog')
const dbInitializer = require('./test_database_initializer')

describe('blog api tests', () => {
  const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(dbInitializer.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(dbInitializer.initialBlogs.length)
})

test('blogs have field id defined', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('new blog can be added', async () => {
  const newBlogTitle = 'My nice blog post'
  
  const newBlog = getNewBlog()
  newBlog.title = newBlogTitle

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsAfterAdding = await dbInitializer.blogsInDb()
  expect(blogsAfterAdding).toHaveLength(dbInitializer.initialBlogs.length + 1)

  const expectedTitlesAfterAdding = blogsAfterAdding.map(blog => blog.title)
  expect(expectedTitlesAfterAdding).toContain(newBlogTitle)
})

test('new blog without likes defined initializes the likes with 0', async () => {
  const newBlog = getNewBlog()
  delete newBlog.likes

  const response = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const addedBlog = response.body
  expect(addedBlog.likes).toBeDefined()
  expect(addedBlog.likes).toBe(0)
})

const getNewBlog = () => {
  return {
    title: 'Lorem ipsum',
    author: 'Peter Pettigrew',
    url: 'www.example.com',
    likes: 100,
  }
}

test('new blog without title will result in a bad request and nothing is added', async () => {
  const newBlog = getNewBlog()
  delete newBlog.title

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

test('new blog without url will result in a bad request and nothing is added', async () => {
  const newBlog = getNewBlog()
  delete newBlog.url

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

test('Delete an individual blog post', async () =>  {
  const allBlogsInStart = await dbInitializer.blogsInDb()
  const blogToDelete = allBlogsInStart[0]
  
  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)

  const allBlogsAfterDelete = await dbInitializer.blogsInDb()

  expect(allBlogsAfterDelete.length).toBe(allBlogsInStart.length - 1)
  expect(allBlogsAfterDelete).not.toContain(blogToDelete);
})

test('Try delete an individual blog post with non existing id', async () => {
  const allBlogsInStart = await dbInitializer.blogsInDb()
  const idThatDoesNotExist = '62a2f4482641fba000060f50'

  await api
  .delete(`/api/blogs/${idThatDoesNotExist}`)
  .expect(204)

  const allBlogsAfterDelete = await dbInitializer.blogsInDb()

  expect(allBlogsAfterDelete.length).toBe(allBlogsInStart.length)
})

test('Liking a blog increases the like count', async () => {
  const allBlogsInStart = await dbInitializer.blogsInDb()
  const blogToUpdate = allBlogsInStart[0]

  const likedBlog = {... blogToUpdate, likes: blogToUpdate.likes + 1}

  const response = await api
  .put(`/api/blogs/${blogToUpdate.id}`)
  .send(likedBlog)

  const returnedBlog = response.body
  expect(returnedBlog.likes).toBe(likedBlog.likes)
  expect(returnedBlog.title).toBe(likedBlog.title)

})

afterAll(() => {
  mongoose.connection.close()
})
})