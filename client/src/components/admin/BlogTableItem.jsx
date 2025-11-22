import React from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt)

    const { axios } = useAppContext();

    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog ?')
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/blog/delete', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className="border-y border-gray-200 hover:bg-gray-50 transition">
  {/* Index */}
  <th className="px-3 py-4 text-gray-600 font-medium">{index}</th>

  {/* Title */}
  <td className="px-3 py-4 font-medium text-gray-800">{title}</td>

  {/* Date */}
  <td className="px-3 py-4 max-sm:hidden text-gray-500">
    {BlogDate.toDateString()}
  </td>

  {/* Publish Status */}
  <td className="px-3 py-4 max-sm:hidden">
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        blog.isPublished
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {blog.isPublished ? "Published" : "Unpublished"}
    </span>
  </td>

  {/* Actions */}
  <td className="px-3 py-4 flex items-center gap-4 text-sm">
    {/* Publish / Unpublish Button */}
    <button
      onClick={togglePublish}
      className={`px-3 py-1 rounded-md border text-xs font-medium transition
        ${
          blog.isPublished
            ? "border-orange-500 text-orange-600 hover:bg-orange-50"
            : "border-green-600 text-green-700 hover:bg-green-50"
        }
      `}
    >
      {blog.isPublished ? "Unpublish" : "Publish"}
    </button>

    {/* Delete Icon */}
    <i
      className="fa-solid fa-xmark text-red-600 text-lg hover:scale-110 hover:text-red-700 transition cursor-pointer"
      onClick={deleteBlog}
    ></i>
  </td>
</tr>

    )
}

export default BlogTableItem