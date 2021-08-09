// este fichero lo uso para crear las funciones que usaré en los tests, que 
// realmente no existe puesto serán las propias funciones de mi código
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
