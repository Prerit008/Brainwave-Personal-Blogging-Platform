import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

    const { axios, setToken } = useAppContext()
    const navigate = useNavigate()

    const logout = () => { 
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)
        navigate('/')
    }
    return (
        <>
            <div className="flex flex-col h-screen">
  {/* Top Navbar */}
  <header className="flex items-center justify-between h-[70px] px-4 sm:px-12 border-b border-gray-200 bg-white shadow-sm">
    <div
      onClick={() => navigate('/')}
      className="flex items-center gap-2 cursor-pointer"
    >
      <i className="fa-solid fa-brain text-3xl text-primary"></i>
      <span className="text-xl font-semibold text-primary">Brainwave</span>
    </div>

    <button
      onClick={logout}
      className="px-6 sm:px-8 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      Logout
    </button>
  </header>

  {/* Main Content */}
  <div className="flex flex-1 overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-y-auto bg-blue-50/50 p-4 md:p-10">
      <Outlet />
    </main>
  </div>
</div>

        </>
    )
}

export default Layout