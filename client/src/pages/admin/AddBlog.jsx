import React, { useEffect, useRef, useState } from 'react'
import { blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);

            // Cleanup old blob URL
            return () => URL.revokeObjectURL(url);
        }
    };


    const { axios } = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async () => {
        if (!title) return toast.error('Please enter a title')

        try {
            setLoading(true);
            const { data } = await axios.post('/api/blog/generate', { prompt: title })
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsAdding(true)

            const blog = {
                title, subTitle,
                description: quillRef.current.root.innerHTML,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            const { data } = await axios.post('/api/blog/add', formData);

            if (data.success) {
                toast.success(data.message);
                setImage(false)
                setTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsAdding(false)
        }
    }

    useEffect(() => {
        //Initiate Quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex-1 bg-blue-50/50 text-gray-700 h-full overflow-auto p-4 md:p-8"
        >
            <div className="bg-white w-full max-w-3xl mx-auto p-6 md:p-10 shadow-lg rounded-xl space-y-6">

                {/* Header */}
                <h2 className="text-2xl font-semibold text-gray-800">Create New Blog</h2>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="font-medium text-gray-700">Upload Thumbnail</label>

                    <label
                        htmlFor="image"
                        className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer transition hover:border-blue-400 bg-gray-50"
                    >
                        {!image ? (
                            <div className="flex flex-col items-center text-gray-500">
                                <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
                                <span className="text-xs mt-1">Click to upload</span>
                            </div>
                        ) : (
                            <img
                                src={imagePreview}
                                alt="Uploaded preview"
                                className="h-full w-full rounded-lg object-cover"
                            />
                        )}

                        <input
                            type="file"
                            id="image"
                            hidden
                            required
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                {/* Blog Title */}
                <div className="space-y-1">
                    <label className="font-medium text-gray-700">Blog Title</label>
                    <input
                        type="text"
                        placeholder="Enter blog title"
                        required
                        className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Sub Title */}
                <div className="space-y-1">
                    <label className="font-medium text-gray-700">Sub Title</label>
                    <input
                        type="text"
                        placeholder="Write a subtitle"
                        required
                        className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    />
                </div>

                {/* Blog Content Editor */}
                <div className="space-y-2">
                    <label className="font-medium text-gray-700">Blog Description</label>

                    <div className="relative border border-gray-300 rounded-lg p-2 bg-gray-50">
                        <div ref={editorRef} className="min-h-[150px]"></div>

                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                                <div className="w-8 h-8 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            type="button"
                            onClick={generateContent}
                            className="absolute bottom-2 right-2 text-xs bg-blue-600 text-white px-3 py-1.5 rounded shadow hover:bg-blue-700 transition"
                        >
                            Generate with AI
                        </button>
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                    <label className="font-medium text-gray-700 mr-4">Blog Category</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        name="category"
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        <option value="">Select category</option>
                        {blogCategories.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center gap-3">
                    <label className="font-medium text-gray-700">Publish Now</label>
                    <input
                        type="checkbox"
                        checked={isPublished}
                        className="scale-125 accent-blue-600 cursor-pointer"
                        onChange={(e) => setIsPublished(e.target.checked)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    disabled={isAdding}
                    type="submit"
                    className="mt-4 w-full md:w-40 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow transition"
                >
                    {isAdding ? "Adding..." : "Add Blog"}
                </button>
            </div>
        </form>

    )
}

export default AddBlog
