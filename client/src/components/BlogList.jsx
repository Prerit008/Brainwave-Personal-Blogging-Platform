import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {

  const [menu, setMenu] = useState("All")
  const { blog: blogs = [], input = '' } = useAppContext()

  const filteredBlogs = () => {
    if (input === '') {
      return blogs
    }
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div className="z-50">
  {/* Category Menu */}
  <div className="flex justify-center gap-4 sm:gap-6 my-10 relative overflow-x-auto px-4 sm:px-8">
    {blogCategories.map((item) => (
      <button
        key={item}
        onClick={() => setMenu(item)}
        className={`
          relative px-4 py-1 rounded-full text-sm font-medium transition-all duration-300
          ${menu === item 
            ? 'bg-primary text-white shadow-md' 
            : 'text-gray-500 hover:text-primary hover:bg-primary/10'}
        `}
      >
        {item}
      </button>
    ))}
  </div>

  {/* Blog Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-4 sm:mx-16 xl:mx-40">
    {filteredBlogs()
      .filter(blog => menu === "All" || blog.category === menu)
      .map(blog => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
  </div>
</div>

  )
}

export default BlogList