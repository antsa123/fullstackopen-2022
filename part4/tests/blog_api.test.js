const mongoose = require('mongoose')
const supertest = require('supertest')
const { all } = require('../app')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const dbInitializer = require('./test_database_initializer')
const api = supertest(app)

describe('blog api tests', () => {
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

  const getNewBlog = async () => {
    return {
      title: 'Lorem ipsum',
      author: 'Peter Pettigrew',
      url: 'www.example.com',
      likes: 100
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
})

describe('user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('Add 2 users and get all users', async () => {
    
    const user1 = dbInitializer.initialUsers[0]
    const user2 = dbInitializer.initialUsers[1]
    

    await api.post('/api/users')
    .send(user1)
    .expect(201)
    
    await api.post('/api/users')
    .send(user2)
    .expect(201)

    const response = await api
    .get('/api/users')
    .expect(200)

    const usersInDb = await dbInitializer.usersInDb()

    expect(response.body.length).toBe(dbInitializer.initialUsers.length)
    expect(response.body.length).toBe(usersInDb.length)
  })

  test('New user must have unique name', async () => {
    const usersAtStart = await dbInitializer.usersInDb()
    
    const user1 = dbInitializer.initialUsers[0]

    await api.post('/api/users')
    .send(user1)
    .expect(201)

    const response = await api.post('/api/users')
    .send(user1)
    .expect(400)

    expect(response.body.error).toContain('username must be unique')
    
    const usersAtEnd = await dbInitializer.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('New user\'s password must be at least 3 chars long', async () => {
    const usersAtStart = await dbInitializer.usersInDb()
    const badUser = dbInitializer.initialUsers.find(user => user.password.length < 3)

    const response = await api.post('/api/users')
    .send(badUser)
    .expect(400)

    expect(response.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await dbInitializer.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})