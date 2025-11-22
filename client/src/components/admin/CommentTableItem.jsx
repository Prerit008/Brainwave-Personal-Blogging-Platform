import React from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {

    const { blog, createdAt, _id } = comment;
    const BlogDate = new Date(createdAt);

    const { axios } = useAppContext()

    const approveComment = async () => {
        try {
            const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const deleteComment = async () => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this comment ?');
            if (!confirm) return;

            const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
      <tr className="border-y border-gray-200 hover:bg-gray-50 transition">
  {/* Comment Details */}
  <td className="px-6 py-4 text-sm leading-relaxed">
    <div>
      <span className="font-medium text-gray-600">Blog:</span>{" "}
      <span className="text-gray-800">{blog.title}</span>
    </div>

    <div className="mt-3">
      <span className="font-medium text-gray-600">Name:</span>{" "}
      <span className="text-gray-800">{comment.name}</span>
    </div>

    <div>
      <span className="font-medium text-gray-600">Comment:</span>{" "}
      <span className="text-gray-800">{comment.content}</span>
    </div>
  </td>

  {/* Date */}
  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
    {BlogDate.toLocaleDateString()}
  </td>

  {/* Actions */}
  <td className="px-6 py-4">
    <div className="inline-flex items-center gap-4">

      {/* Approve Icon / Badge */}
      {!comment.isApproved ? (
        <button
          onClick={approveComment}
          className="text-green-600 hover:text-green-700 hover:scale-110 transition"
          title="Approve Comment"
        >
          <i className="fa-solid fa-check text-lg"></i>
        </button>
      ) : (
        <span className="text-xs border border-green-600 bg-green-100 text-green-700 rounded-full px-3 py-1">
          Approved
        </span>
      )}

      {/* Delete Icon */}
      <button
        onClick={deleteComment}
        className="text-red-600 hover:text-red-700 hover:scale-110 transition"
        title="Delete Comment"
      >
        <i className="fa-solid fa-trash text-lg"></i>
      </button>
    </div>
  </td>
</tr>

    )
}

export default CommentTableItem