import React from 'react'

const Newsletter = () => {
  return (
   <div className="flex flex-col items-center justify-center text-center space-y-4 my-32 px-4 sm:px-0">
  {/* Heading */}
  <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
    Never miss a Blog!
  </h1>

  {/* Subtext */}
  <p className="text-gray-500 text-sm md:text-lg max-w-md">
    Subscribe to get the latest blogs, new tech, and exclusive news.
  </p>

  {/* Subscription Form */}
  <form className="flex flex-col sm:flex-row mt-4">
    <input
      type="email"
      placeholder="Enter your email"
      required
      className="h-10 px-4 text-gray-700 border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition w-72 sm:w-80"
    />
    <button
      type="submit"
      className="h-10 mt-2 sm:mt-0 sm:ml-0 sm:-ml-1 bg-primary text-white px-8 sm:px-12 rounded-md sm:rounded-l-none hover:bg-primary/90 transition-all font-medium"
    >
      Subscribe
    </button>
  </form>
</div>

  )
}

export default Newsletter