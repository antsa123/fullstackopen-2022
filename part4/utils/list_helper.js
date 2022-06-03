const totalLikesOfAllBlogs = (blogs) => {
  return blogs.reduce((sum, item) => { return sum + item.likes }, 0)
}

const blogWithMostLikes = (blogs) => {
  return blogs.reduce((previousWithMaxLikes, candidateForMaxLikes) => {
    return (previousWithMaxLikes.likes > candidateForMaxLikes.likes) ? previousWithMaxLikes : candidateForMaxLikes
  })
}

const authorWithMostBlogsAndBlogCount = (blogs) => {
  let writers = []
  blogs.forEach((currentBlog) => {
    let writerToUpdate = writers.find(writer => writer.author === currentBlog.author)
    if (writerToUpdate)
    {
      writerToUpdate.blogs += 1
      return
    }

    writers.push(
      {
        'author': currentBlog.author,
        'blogs': 1
      })
  })

  return writers.reduce((previousWithMostBlogs, candidateForMostBlogs) => {
    return (previousWithMostBlogs.blogs > candidateForMostBlogs.blogs) ? previousWithMostBlogs : candidateForMostBlogs
  })
}

const mostLikedAuthorAndLikeCount = (blogs) => {
  let writers = []
  blogs.forEach((currentBlog) => {
    let writerToUpdate = writers.find(writer => writer.author === currentBlog.author)
    if (writerToUpdate)
    {
      writerToUpdate.likes += currentBlog.likes
      return
    }

    writers.push(
      {
        'author': currentBlog.author,
        'likes': currentBlog.likes
      })
  })

  return writers.reduce((previousWithMostLikes, candidateForMostLikes) => {
    return (previousWithMostLikes.likes > candidateForMostLikes.likes) ? previousWithMostLikes : candidateForMostLikes
  })
}


module.exports = {
  totalLikesOfAllBlogs,
  blogWithMostLikes,
  authorWithMostBlogsAndBlogCount,
  mostLikedAuthorAndLikeCount
}