import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditBook() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', author: '', price: '', description: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then(data => {
        setForm({
          title: data.title || '',
          author: data.author || '',
          price: data.price || '',
          description: data.description || '',
          image: data.image || ''
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    fetch(`/api/books/${id}` , {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price) })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update book');
        return res.json();
      })
      .then(() => navigate(`/books/${id}`))
      .catch(err => setError(err.message));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: <input name="title" value={form.title} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Author: <input name="author" value={form.author} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Price: <input name="price" type="number" value={form.price} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Description: <textarea name="description" value={form.description} onChange={handleChange} /></label>
        </div>
        <div>
          <label>Image URL: <input name="image" value={form.image} onChange={handleChange} /></label>
        </div>
        <button type="submit">Update Book</button>
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
    </div>
  );
}
