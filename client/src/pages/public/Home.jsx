// src/pages/Public/Home.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';


    export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    getPosts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-900/20 border border-red-400 text-red-200 p-4 rounded">
      Error loading posts: {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8">All Posts</h1>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300 mb-4">No posts available yet.</p>
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
                        onClick={() => navigate(`/post/${post._id}`)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors cursor-pointer"
                      >
                        View
                      </button>
                      {/* Optional: Show edit button only for owner */}
                      {/* <button
                        onClick={() => navigate(`/edit-post/${post._id}`)}
                        className="px-3 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
                      >
                        Edit
                      </button> */}
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
}