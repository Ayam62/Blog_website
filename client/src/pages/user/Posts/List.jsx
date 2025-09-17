import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyPosts } from '../../../services/api.js';

const List = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchMyPosts();
        setPosts(data);
      } catch (err) {
        console.error('Component error:', err);
        setError(err.message);
        
        // Handle 401 unauthorized
        if (err.message.includes('authenticate') || 
            (err.response?.status === 401)) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-2"></div>
          <p>Loading your posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4">Error loading posts</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8">Your Posts</h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300 mb-4">You haven't created any posts yet.</p>
            <button 
              onClick={() => navigate('/create-post')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div 
                key={post._id} 
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-700 hover:border-indigo-500"
              >
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-white">{post.title}</h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <div className="space-x-2">
                      <button 
                        onClick={() => navigate(`/edit-post/${post._id}`)}
                        className="px-3 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => navigate(`/post/${post._id}`)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;