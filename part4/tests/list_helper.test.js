const listHelper = require('../utils/list_helper')
describe('total likes', () => {
  const blogInput = require('./blog_test_inputs')


  test('total likes with multiple liked blogs', () => {
    const result = listHelper.totalLikes(blogInput)
    expect(result).toBe(36)
  })

  test('total likes with empty input', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('total with only one input with likes', () => {
    const result = listHelper.totalLikes([blogInput[0]])
    expect(result).toBe(blogInput[0].likes)
  })

  test('total with multiple non liked blogs', () => {
    const blogsWith0Likes = blogInput.map(blog => {
      blog.likes = 0
      return blog
    })
    const result = listHelper.totalLikes(blogsWith0Likes)
    expect(result).toBe(0)
  })
})