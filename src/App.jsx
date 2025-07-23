
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CommentsTable from './components/CommentsTable';


function App() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      const commentsRes = await fetch('https://jsonplaceholder.typicode.com/comments');
      let commentsData = await commentsRes.json();

      // Check localStorage for edited data
      const saved = localStorage.getItem('editedComments');
      const edited = saved ? JSON.parse(saved) : {};

      // Merge edits
      commentsData = commentsData.map((comment) =>
        edited[comment.id] ? { ...comment, ...edited[comment.id] } : comment
      );

      const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
      const postsData = await postsRes.json();

      setComments(commentsData);
      setPosts(postsData);
    }

    fetchData();
  }, []);

  const filteredComments = comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id, field, value) => {
    const updated = comments.map((comment) =>
      comment.id === id ? { ...comment, [field]: value } : comment
    );
    setComments(updated);

    const editedData = localStorage.getItem('editedComments');
    const edited = editedData ? JSON.parse(editedData) : {};
    if (!edited[id]) edited[id] = {};
    edited[id][field] = value;

    localStorage.setItem('editedComments', JSON.stringify(edited));
  };

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <CommentsTable
        comments={filteredComments}
        posts={posts}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;