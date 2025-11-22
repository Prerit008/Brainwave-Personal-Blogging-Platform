import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="flex flex-col border-r border-gray-200 min-h-full pt-6 bg-white">
  {/* Dashboard */}
  <NavLink
    end
    to="/admin"
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-4 md:px-8 rounded-r-lg cursor-pointer transition-colors duration-200
      ${isActive ? "bg-primary/10 border-r-4 border-primary font-semibold text-primary" : "text-gray-700 hover:bg-gray-100"}`
    }
  >
    <i className="fa-solid fa-house w-5 text-lg"></i>
    <span className="hidden md:inline-block">Dashboard</span>
  </NavLink>

  {/* Add Blogs */}
  <NavLink
    to="/admin/addBlog"
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-4 md:px-8 rounded-r-lg cursor-pointer transition-colors duration-200
      ${isActive ? "bg-primary/10 border-r-4 border-primary font-semibold text-primary" : "text-gray-700 hover:bg-gray-100"}`
    }
  >
    <i className="fa-solid fa-plus w-5 text-lg"></i>
    <span className="hidden md:inline-block">Add Blogs</span>
  </NavLink>

  {/* Blog Lists */}
  <NavLink
    to="/admin/listBlog"
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-4 md:px-8 rounded-r-lg cursor-pointer transition-colors duration-200
      ${isActive ? "bg-primary/10 border-r-4 border-primary font-semibold text-primary" : "text-gray-700 hover:bg-gray-100"}`
    }
  >
    <i className="fa-solid fa-list w-5 text-lg"></i>
    <span className="hidden md:inline-block">Blog Lists</span>
  </NavLink>

  {/* Comments */}
  <NavLink
    to="/admin/comments"
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-4 md:px-8 rounded-r-lg cursor-pointer transition-colors duration-200
      ${isActive ? "bg-primary/10 border-r-4 border-primary font-semibold text-primary" : "text-gray-700 hover:bg-gray-100"}`
    }
  >
    <i className="fa-regular fa-comments w-5 text-lg"></i>
    <span className="hidden md:inline-block">Comments</span>
  </NavLink>
</div>

    )
}

export default Sidebar