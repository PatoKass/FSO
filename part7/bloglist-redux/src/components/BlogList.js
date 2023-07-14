import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found.</div>
  }
  let sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes) //sorted according to likes, from most to least

  return (
    <div className="flex w-auto my-8 relative justify-center flex-col items-center rounded-2xl border-red-950 border-2">
      <h2 className="p-3 my-8 text-3xl">Blogs:</h2>
      {sortedBlogs.map((blog) => (
        <div className="p-4 my-3" key={blog.id}>
          <Link
            className="p-3  border-2 border-red-900 bg-red-500"
            to={`/blogs/${blog.id}`}
          >
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
