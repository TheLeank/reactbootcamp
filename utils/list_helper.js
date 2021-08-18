const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } 

  return blogs.reduce((sum, b) => {
    return sum + b.likes 
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => {
    return blog.likes >= max.likes
      ? blog
      : max
  })
}

const mostBlogs = (blogs) => {
  // los agrupo por autor
  const grouped = _.groupBy(blogs, 'author')
  // guardo el objeto del autor cuyo numero de elementos es mayor
  const author = _.reduce(grouped, (max, blog) => {
    return _.size(blog) >=_.size(max)
      ? blog
      : max
    })
    // con sample devuelvo un elemento aleatorio de la colección, y uso su prop
    // author
    return { 'author': _.sample(author).author, 'blogs': _.size(author) }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
