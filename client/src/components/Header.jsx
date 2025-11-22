import React, { useRef } from 'react'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className="mx-6 sm:mx-16 xl:mx-24 relative">
  {/* Hero Section */}
  <div className="text-center mt-20 mb-10">
    {/* Highlight Badge */}
    <div className="inline-flex items-center justify-center gap-2 px-5 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary font-medium">
      <p>Update: AI-powered writing assistant</p>
      <i className="fa-solid fa-rocket text-primary"></i>
    </div>

    {/* Heading */}
    <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold sm:leading-tight text-gray-700">
      Start <span className="text-primary">sharing</span> your thoughts <br /> today
    </h1>

    {/* Subtext */}
    <p className="my-6 sm:my-8 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
      Express yourself freely, connect with others, and document your ideas. From a single note to detailed articles, every story matters here.
    </p>

    {/* Search Form */}
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between max-w-lg mx-auto border border-gray-300 bg-white rounded-lg overflow-hidden shadow-sm"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Find articles or authors"
        required
        className="w-full px-4 py-2 sm:py-3 outline-none text-gray-700"
      />
      <button
        type="submit"
        className="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 hover:scale-105 transition-transform font-medium cursor-pointer"
      >
        Search
      </button>
    </form>
</div>


  {/* Clear Search Button */}
  {input && (
    <div className="text-center mt-4">
      <button
        onClick={onClear}
        className="border font-light text-xs py-1 px-3 rounded-sm shadow-sm hover:shadow-md transition cursor-pointer"
      >
        Clear Search
      </button>
    </div>
  )}
</div>

  )
}

export default Header