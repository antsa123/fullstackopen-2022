const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = require('./blog_test_inputs')
const initialUsers = require('./user_test_inputs')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}