import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
  <div
    role="status"
    className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-primary"
  >
    <span className="sr-only">Loading...</span>
  </div>
</div>

    )
}

export default Loader