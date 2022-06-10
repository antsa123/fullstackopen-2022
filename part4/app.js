const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
require('express-async-errors')

const blogRouter = require('./controllers/blogController')
const usersRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)

module.exports = app