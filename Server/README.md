# Blogging Platform Api

A full-stack blog platform with media storage, user authentication, content management, and public/private API sections. Built with Node.js, Express, MongoDB, and Cloudinary for image uploads.

---

## Features

- **Dual-section architecture**
  - **Public section:** Anyone can read articles, browse by category or tag, and view/add comments.
  - **Admin dashboard:** Authenticated users can create, edit, and delete blog posts, manage users, and upload images.

- **Content creation system**
  - Create, edit, and publish blog posts with support for images.
  - Organize posts by category and tags.

- **Media management**
  - Secure image upload and deletion via Cloudinary.
  - Images can be attached to blog posts.

- **Category and tagging system**
  - Filter posts by category or tag for better content discovery.

- **Commenting functionality**
  - Authenticated users can add comments to blog posts.
  - Anyone can view comments on posts.

- **User authentication**
  - Register, login, logout, password reset, and protected admin routes.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Media Storage:** Cloudinary
- **Other:** Multer (file uploads), dotenv

---

## API Endpoints

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login
- `POST /api/auth/logout` – Logout
- `POST /api/auth/forgot-password` – Request password reset
- `POST /api/auth/reset-password` – Reset password

### Admin (Protected)
- `POST /api/posts/post` – Create a blog post
- `PUT /api/posts/update/:id` – Update a blog post
- `DELETE /api/posts/delete/:id` – Delete a blog post
- `GET /api/posts/` – Get all posts by the authenticated user
- `POST /api/uploads/upload` – Upload an image
- `DELETE /api/uploads/delete/:publicId` – Delete an image
- `GET /api/user/current` – Get current user info
- `PUT /api/user/update` – Update user info
- `DELETE /api/user/delete` – Delete user

### Public
- `GET /api/public/posts/` – Get all blog posts
- `GET /api/public/posts/:postId` – Get a single post by ID
- `GET /api/public/posts/category/:name` – Get posts by category
- `GET /api/public/posts/tag/:tag` – Get posts by tag
- `POST /api/public/posts/:postId/comment` – Add a comment (protected)
- `GET /api/public/posts/:postId/comments` – Get comments for a post

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayam62/MediaStorageCloud.git
   cd MediaStorageCloud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add:
   ```
   PORT=any_port
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the server**
   ```bash
   npm start
   ```

---

## Notes

- **SEO optimization** is not implemented in this version.
- Make sure to keep your `.env` file private and never commit it to version control.
- For image uploads, use the `file` field in your form-data requests.

---

## Contributions

Contributions and suggestions are welcome! Please open an issue or submit a pull request.
