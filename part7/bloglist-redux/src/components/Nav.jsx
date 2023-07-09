import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ username, handleLogout }) => {
  return (
    <div className="bg-yellow-200 flex align-top items-center justify-end p-2">
      <Link className="p-5 m-2 text-cyan-500" to="/">
        blogs
      </Link>
      <Link className="p-5 m-2 text-cyan-500" to="/users">
        users
      </Link>

      <strong className=" font-mono">{username} logged in</strong>
      <button
        className="p-2 m-2 rounded-md bg-indigo-600 text-white"
        id="logout-btn"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Nav
