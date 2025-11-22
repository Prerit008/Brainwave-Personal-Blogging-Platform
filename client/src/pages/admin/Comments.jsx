import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

    const [comments, setComments] = useState([])
    const [filter, setFilter] = useState('Not Approved')

    const { axios } = useAppContext();

    const fetchComments = async () => {
        try {
            const { data } = await axios.get('/api/admin/comments')
            data.success ? setComments(data.comments) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)

        }

    }

    useEffect(() => {
        fetchComments()
    }, [])
    return (
        <div className="flex-1 pt-6 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-3xl mb-4 gap-4">
    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Comments</h1>

    {/* Filter Buttons */}
    <div className="flex gap-3">
      <button
        onClick={() => setFilter("Approved")}
        className={`px-4 py-1 text-xs rounded-full border shadow-sm transition-colors duration-200 ${
          filter === "Approved" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Approved
      </button>

      <button
        onClick={() => setFilter("Not Approved")}
        className={`px-4 py-1 text-xs rounded-full border shadow-sm transition-colors duration-200 ${
          filter === "Not Approved" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Not Approved
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="relative max-w-3xl overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="w-full text-sm text-gray-600">
      <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
        <tr>
          <th scope="col" className="px-6 py-3 text-left">
            Blog & Comment
          </th>
          <th scope="col" className="px-6 py-3 max-sm:hidden text-left">
            Date
          </th>
          <th scope="col" className="px-6 py-3 text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {comments
          .filter(comment => (filter === "Approved" ? comment.isApproved : !comment.isApproved))
          .map((comment, index) => (
            <CommentTableItem
              key={comment._id}
              comment={comment}
              index={index + 1}
              fetchComments={fetchComments}
            />
          ))}
      </tbody>
    </table>
  </div>
</div>

    )
}

export default Comments