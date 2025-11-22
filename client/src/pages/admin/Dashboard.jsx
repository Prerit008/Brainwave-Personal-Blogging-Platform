import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios } = useAppContext()

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard')
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDashboard()

    }, [])

    return (
        <div className="flex-1 p-4 md:p-10 bg-blue-50/50 min-h-screen">
  {/* Stats Cards */}
  <div className="flex flex-wrap gap-4 mb-8">
    {/* Blogs Card */}
    <div className="flex items-center gap-4 bg-white p-4 min-w-[14rem] rounded-lg shadow hover:scale-105 transition-transform cursor-pointer">
      <i className="fa-solid fa-newspaper text-3xl text-primary"></i>
      <div>
        <p className="text-xl font-semibold text-gray-700">{dashboardData.blogs}</p>
        <p className="text-gray-400 font-light">Blogs</p>
      </div>
    </div>

    {/* Comments Card */}
    <div className="flex items-center gap-4 bg-white p-4 min-w-[14rem] rounded-lg shadow hover:scale-105 transition-transform cursor-pointer">
      <i className="fa-solid fa-comments text-3xl text-primary"></i>
      <div>
        <p className="text-xl font-semibold text-gray-700">{dashboardData.comments}</p>
        <p className="text-gray-400 font-light">Comments</p>
      </div>
    </div>

    {/* Drafts Card */}
    <div className="flex items-center gap-4 bg-white p-4 min-w-[14rem] rounded-lg shadow hover:scale-105 transition-transform cursor-pointer">
      <i className="fa-solid fa-cloud-slash text-3xl text-primary"></i>
      <div>
        <p className="text-xl font-semibold text-gray-700">{dashboardData.drafts}</p>
        <p className="text-gray-400 font-light">Drafts</p>
      </div>
    </div>
  </div>

  {/* Latest Blogs Section */}
  <div>
    <div className="flex items-center gap-3 mb-4 text-gray-600 text-lg font-medium">
      <p>Latest Blogs</p>
    </div>

    <div className="relative max-w-4xl overflow-x-auto shadow-md rounded-lg bg-white scrollbar-hide">
      <table className="w-full text-sm text-gray-600">
        <thead className="text-xs text-gray-700 text-left uppercase bg-gray-100">
          <tr>
            <th className="px-3 py-3">#</th>
            <th className="px-3 py-3">Blog Title</th>
            <th className="px-3 py-3 max-sm:hidden">Date</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dashboardData.recentBlogs.map((blog, index) => (
            <BlogTableItem
              key={blog._id}
              blog={blog}
              fetchBlogs={fetchDashboard}
              index={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    )
}

export default Dashboard