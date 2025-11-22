import React from 'react'
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
 
  const { token } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-5 px-6 sm:px-20 xl:px-32">
  {/* Logo / Brand */}
  <div 
    onClick={() => navigate('/')} 
    className="flex items-center gap-2 cursor-pointer select-none group"
  >
    <i className="fa-solid fa-brain text-4xl text-primary transition-transform duration-200 group-hover:scale-110"></i>
    <span className="text-2xl font-semibold text-primary tracking-tight">
      Brainwave
    </span>
  </div>

  {/* CTA Button */}
  <button
    onClick={() => navigate('/admin')}
    className="
      flex items-center gap-2 rounded-full text-sm font-medium 
      bg-primary text-white px-8 py-2.5 shadow-md 
      transition-all duration-200 hover:bg-primary/90 hover:shadow-lg active:scale-95
    "
  >
    {token ? 'Dashboard' : 'Login'}
    <i className="fa-solid fa-arrow-right"></i>
  </button>
</div>

  )
}

export default Navbar