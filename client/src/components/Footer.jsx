import React from 'react'

const Footer = () => {
  return (
    <div className="md:mx-10 mt-20">
  {/* Top Section */}
  <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">

    {/* About Section */}
    <div>
      <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate('/')}>
        <i className="fa-solid fa-brain text-2xl text-primary"></i>
        <span className="font-semibold text-lg text-primary">Brainwave</span>
      </div>
      <p className="w-full md:w-2/3 text-gray-600 leading-6">
        Brainwave is your space to share ideas, explore tech, and discover new insights. Stay connected with the latest blogs, tech trends, and tutorials from our expert contributors.
      </p>
    </div>

    {/* Quick Links */}
    <div>
  <p className="text-xl font-medium mb-5">Quick Links</p>
  <ul className="flex flex-col gap-2 text-gray-600">
    <li>
      <a
        href="https://www.linkedin.com/in/prerit008/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors cursor-pointer"
      >
        LinkedIn
      </a>
    </li>
    <li>
      <a
        href="https://github.com/prerit008"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors cursor-pointer"
      >
        GitHub
      </a>
    </li>
    <li>
      <a
        href="https://codeforces.com/profile/prerit08"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors cursor-pointer"
      >
        Codeforces
      </a>
    </li>
    <li>
      <a
        href="https://prerit008.github.io"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors cursor-pointer"
      >
        Portfolio
      </a>
    </li>
  </ul>
</div>

    {/* Contact Info */}
    <div>
      <p className="text-xl font-medium mb-5">Contact Us</p>
      <ul>
        <li className="hover:text-primary cursor-pointer"><a
        href="mailto:preritagrawal08@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors cursor-pointer">preritagrawal08@gmail.com</a></li>
        <li className="hover:text-primary cursor-pointer"><a
        href="https://brainwaveblog.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors cursor-pointer"
      >brainwaveblog.vercel.app</a></li>
      </ul>
    </div>

  </div>

  {/* Bottom Section */}
  <div className="border-t border-gray-200">
    <p className="py-5 text-sm text-center text-gray-500">
      &copy; 2025 Brainwave. All rights reserved.
    </p>
  </div>
</div>

  )
}

export default Footer