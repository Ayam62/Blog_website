import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar
import Home from "./pages/public/Home.jsx";
import Post from "./pages/public/Post.jsx";
import Category from "./pages/public/Category.jsx";
import Tag from "./pages/public/Tag.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreatePost from "./pages/user/Posts/New.jsx";
import List from "./pages/user/Posts/List.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {" "}
      {/* Dark theme container */}
      <Navbar /> {/* Navbar appears on all pages */}
      <main className="pt-16">
        {" "}
        {/* Add padding-top to prevent content hiding behind navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/tag/:tag" element={<Tag />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />

          {/* Protected Admin Routes */}
          {/* <Route path="/admin" element={<PrivateRoute />}> */}
          {/* <Route index element={<Dashboard />} /> */}
          {/* <Route path="posts" element={<PostList />} /> */}
          {/* <Route path="posts/new" element={<NewPost />} /> */}
          {/* </Route> */}
          {/* Protected Routes */}

          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-posts"
            element={
              <PrivateRoute>
                <List />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
