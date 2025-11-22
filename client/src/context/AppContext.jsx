import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Set base URL with fallback
const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
axios.defaults.baseURL = baseURL;

const AppContext = createContext();

export const AppProvider = ( { children }) => {

        const navigate = useNavigate();
        
        const [token, setToken] = useState(null);
        const [blog, setBlog] = useState([]);
        const [input, setInput] = useState("");

        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blog/all');
                data.success ? setBlog(data.blogs) : toast.error(data.message);
            } catch (error) {
                toast.error(error);
            }
        }

        useEffect(() => {
            fetchBlogs();
            const token = localStorage.getItem('token');
            console.log('AppContext: Token from localStorage:', token);
            if (token) {
                setToken(token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                console.log('AppContext: Authorization header set to:', `Bearer ${token}`);
            }
        }, []);

        const value = {
            axios,
            token,
            setToken,
            blog,
            setBlog,
            input,
            setInput
        }

        return (
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}
