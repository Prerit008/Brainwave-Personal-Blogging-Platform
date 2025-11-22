import React, { useState } from 'react'
// import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext.jsx'


const Login = () => {

  const {axios, setToken} = useAppContext('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/admin/login', {email, password})
      console.log('Login response:', data);
      if (data.success){
        console.log('Login successful, token:', data.token);
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        console.log('Authorization header set to:', `Bearer ${data.token}`);
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
  <div className="w-full max-w-sm p-8 border border-gray-200 shadow-lg shadow-primary/10 rounded-xl bg-white">

    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold">
        <span className="text-primary">Admin</span> Login
      </h1>
      <p className="text-gray-500 mt-2 text-sm">
        Enter your credentials to access the admin panel
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="w-full text-gray-700">

      {/* Email */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
        />
      </div>

      {/* Password */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 active:scale-95 transition-transform"
      >
        Login
      </button>
    </form>
  </div>
</div>

  )
}

export default Login