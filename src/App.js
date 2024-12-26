import React, { useState, useEffect } from 'react';
import { fetchData, addData, updateData, deleteData } from './api';  
const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);

  // Mengambil data dari API saat komponen dimuat
  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchData();
      setPosts(data);
    };

    loadPosts();
  }, []);

  // Fungsi untuk menambahkan post baru
  const handleAddPost = async (event) => {
    event.preventDefault();
    try {
      const addedPost = await addData(newPost);
      setPosts([...posts, addedPost]);  // Menambahkan post baru ke dalam state posts
      setNewPost({ title: '', body: '' });  // Reset form
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  // Fungsi untuk mengedit post
  const handleEditPost = async (id, updatedPost) => {
    try {
      const updatedData = await updateData(id, updatedPost);
      setPosts(posts.map(post => post.id === id ? updatedData : post));  // Update post yang diubah
      setEditingPost(null);  // Reset edit form
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Fungsi untuk menghapus post
  const handleDeletePost = async (id) => {
    try {
      await deleteData(id);
      setPosts(posts.filter(post => post.id !== id));  // Menghapus post dari state
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>

      {/* Form untuk menambahkan post */}
      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>

      {/* Daftar post */}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            {/* Tombol Edit */}
            <button onClick={() => setEditingPost(post)}>Edit</button>

            {/* Tombol Delete */}
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form untuk mengedit post */}
      {editingPost && (
        <div>
          <h3>Edit Post</h3>
          <input
            type="text"
            value={editingPost.title}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          />
          <textarea
            value={editingPost.body}
            onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
          />
          <button onClick={() => handleEditPost(editingPost.id, editingPost)}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default App;
