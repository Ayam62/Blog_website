import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, uploadImage } from '../../../services/api.js';

export default function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Check for user authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        // Redirect to login if not authenticated
        navigate('/login');
        return;
      }
      
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (err) {
        console.error('Error parsing user data:', err);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   // console.log(name,value)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Single validation check
  // const missingFields = [];
  // if (!formData.title.trim()) missingFields.push('title');
  // if (!formData.content.trim()) missingFields.push('content');
  // if (!formData.category.trim()) missingFields.push('category');
  // if (!formData.image) missingFields.push('image');

  // if (missingFields.length > 0) {
  //   setError(`Missing required fields: ${missingFields.join(', ')}`);
  //   return;
  // }

  setLoading(true);
  setError('');

  try {
    // 1. Upload image with error handling
    const uploadResponse = await uploadImage(formData.image);
    console.log(uploadResponse)
    const { imageUrl, publicId: imagePublicId } = uploadResponse; // Rename to match backend
    console.log(imageUrl)

    // 2. Prepare post data EXACTLY as backend expects
    const postData = {
      title: formData.title,
      author: currentUser,
      content: formData.content,
      imageUrl: imageUrl?imageUrl:"",
      imagePublicId: imagePublicId,  // Changed to match backend
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    console.log('Final payload to backend:', JSON.stringify(postData, null, 2));
    console.log(currentUser)
    
    // 3. Create post
    const response = await createPost(postData);
    console.log('Backend response:', response);
    navigate('/my-posts');
    
  } catch (err) {
    console.error('Full error details:', {
      message: err.message,
      response: {
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers
      },
      request: {
        url: err.config?.url,
        data: err.config?.data,
        headers: err.config?.headers
      }
    });

    // Enhanced error messages
    const backendError = err.response?.data;
    if (backendError?.errors) {
      // Mongoose validation errors
      const errorList = Object.values(backendError.errors)
        .map(e => e.message)
        .join('\n');
      setError(`Validation errors:\n${errorList}`);
    } else {
      setError(
        backendError?.message ||
        backendError?.error ||
        'Failed to create post. Please check all fields and try again.'
      );
    }
  } finally {
    setLoading(false);
  }
};

  // Don't render the form if user is not authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400">Create New Post</h1>
          <p className="mt-2 text-gray-400">Share your knowledge with the community</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 text-red-300 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              rows={10}
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, webdev"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Featured Image
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="image-upload"
                className="cursor-pointer px-4 py-2 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {formData.image ? 'Change Image' : 'Upload Image'}
              </label>
              <input
                id="image-upload"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              {formData.image && (
                <span className="ml-4 text-sm text-gray-400">
                  {formData.image.name}
                </span>
              )}
            </div>
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-48 object-cover rounded-md border border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                  {console.log('Current token:', localStorage.getItem('token'))}
                </>
              ) : (
                
                'Publish Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}