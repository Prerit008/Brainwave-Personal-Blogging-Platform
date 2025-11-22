import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blog}) => {
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate();


  return (
    <div
  onClick={() => navigate(`/blog/${_id}`)}
  className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white"
>
  {/* Image */}
  <div className="relative">
    <img src={image} alt={title} className="aspect-video w-full object-cover" />
    <span className="absolute top-3 left-3 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
      {category}
    </span>
  </div>

  {/* Content */}
  <div className="p-5">
    <h5 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">{title}</h5>
    <p
      className="text-gray-600 text-sm line-clamp-3"
      dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
    ></p>
  </div>
</div>

  )
}

export default BlogCard