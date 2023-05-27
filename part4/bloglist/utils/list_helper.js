// pendientes 4.6 y .7

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const mostLikes = blogs.reduce((max, blog) => Math.max(max, blog.likes), 0)
  const fav = blogs.find((blog) => blog.likes === mostLikes)
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  }
}

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
}
