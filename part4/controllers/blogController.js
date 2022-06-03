const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    console.log("no title or url")
    response.status(400).json(null)
  }
  else {
    if (!blog.likes) {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

module.exports = blogRouter