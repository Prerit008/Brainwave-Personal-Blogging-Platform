import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const { id } = useParams()

  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id })
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if (data.success) {
        toast.success(data.message)
        setName('')
        setContent('')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [])

  return data ? (
    <div className="relative">
  <Navbar />

  {/* Blog Header */}
  <div className="text-center mt-20 text-gray-700 px-4">
    <p className="text-primary py-2 font-medium">
      Published on {Moment(data.createdAt).format('MMMM Do, YYYY')}
    </p>
    <h1 className="text-2xl sm:text-5xl font-bold max-w-2xl mx-auto text-gray-800">
      {data.title}
    </h1>
    <h2 className="my-5 max-w-lg mx-auto text-gray-600">{data.subTitle}</h2>
    <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/30 bg-primary/5 font-medium text-primary">
      Michael Brown
    </p>
  </div>

  {/* Blog Image and Content */}
  <div className="mx-5 max-w-5xl md:mx-auto my-10">
    <img src={data.image} alt={data.title} className="rounded-3xl mb-6 w-full object-cover" />

    <div className="rich-text max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: data.description }}></div>

    {/* Comments Section */}
    <div className="mt-14 mb-10 max-w-3xl mx-auto">
      <p className="font-semibold mb-6 text-lg">Comments ({comments.length})</p>
      <div className="flex flex-col gap-4">
        {comments.map((item, index) => (
          <div key={index} className="relative bg-primary/5 border border-primary/10 p-4 rounded-lg text-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-regular fa-user w-6 text-gray-500"></i>
              <p className="font-medium">{item.name}</p>
            </div>
            <p className="text-sm ml-8">{item.content}</p>
            <div className="absolute right-4 bottom-3 text-xs text-gray-400">
              {Moment(item.createdAt).fromNow()}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Add Comment Form */}
    <div className="max-w-3xl mx-auto mt-10">
      <p className="font-semibold mb-4 text-lg">Add Your Comment</p>
      <form onSubmit={addComment} className="flex flex-col gap-4 max-w-lg">
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
        />
        <textarea
          placeholder="Comment"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none h-48 focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          className="bg-primary text-white rounded-lg px-6 py-2 hover:scale-105 transition-transform shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  </div>

  <Footer />
</div>

  ) : <Loader />
}

export default Blog