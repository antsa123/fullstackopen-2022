const blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const blogInput = require('./blog_test_inputs')

describe('most blogs', () => {
  test('return author with most blogs and the number of blogs', () =>  {
    const result = listHelper.authorWithMostBlogsAndBlogCount(blogInput)
    expect(result.author).toBe('Robert C. Martin')
    expect(result.blogs).toBe(3)
  })
})

describe('most liked author', () => {
  test('return the author whose blogs have most likes', () => {
    const result = listHelper.mostLikedAuthorAndLikeCount(blogInput)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.likes).toBe(17)
  })
})

describe('total likes', () => {
  test('total likes with multiple liked blogs', () => {
    const result = listHelper.totalLikesOfAllBlogs(blogInput)
    expect(result).toBe(36)
  })

  test('total likes with empty input', () => {
    const result = listHelper.totalLikesOfAllBlogs([])
    expect(result).toBe(0)
  })

  test('total with only one input with likes', () => {
    const result = listHelper.totalLikesOfAllBlogs([blogInput[0]])
    expect(result).toBe(blogInput[0].likes)
  })

  test('total with multiple non liked blogs', () => {
    const blogsWith0Likes = blogInput.map(blog => {
      const blogWith0likes = {...blog, likes: 0}
      return blogWith0likes
    })
    const result = listHelper.totalLikesOfAllBlogs(blogsWith0Likes)
    expect(result).toBe(0)
  })
})

describe('most likes', () => {
  test('return favorite blog', () => {
    const result = listHelper.blogWithMostLikes(blogInput)
    expect(result.likes).toBe(12)
    expect(result.title).toBe('Canonical string reduction')
  })
})
