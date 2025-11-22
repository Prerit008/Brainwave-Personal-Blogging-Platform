import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';

const ListBlog = () => {


    const [blogs, setBlogs] = useState([]);
    const { axios } = useAppContext()

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs')
            if (data.success) {
                setBlogs(data.blogs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className="flex-1 pt-6 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">All Blogs</h1>

  <div className="relative max-w-4xl overflow-x-auto bg-white shadow-md rounded-lg scrollbar-hide">
    <table className="w-full text-sm text-gray-600">
      <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
        <tr>
          <th className="px-3 py-3">#</th>
          <th className="px-3 py-3">Blog Title</th>
          <th className="px-3 py-3 max-sm:hidden">Date</th>
          <th className="px-3 py-3">Status</th>
          <th className="px-3 py-3">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {blogs.map((blog, index) => (
          <BlogTableItem
            key={blog._id}
            blog={blog}
            fetchBlogs={fetchBlogs}
            index={index + 1}
          />
        ))}
      </tbody>
    </table>
  </div>
</div>

    )
}

export default ListBlog