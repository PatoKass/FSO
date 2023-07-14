import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.userlist)
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div className="flex w-auto my-8 relative justify-center flex-col items-center rounded-2xl border-red-950 border-2">
      <h1 className=" text-3xl italic">{user.name}</h1>
      {user.blogs.length > 0 ? (
        <div>
          <h2 className="text-2xl my-3">Added blogs:</h2>
          <ul className="my-3 list-disc">
            {user.blogs.map((blog) => (
              <li className="my-3" key={blog.title}>
                {blog.title}{' '}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>no blogs posted as yet</h2>
      )}
    </div>
  )
}

export default User
