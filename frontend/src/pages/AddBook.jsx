import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const [form, setForm] = useState({ title: '', author: '', price: '', description: '', image: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price) })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add book');
        return res.json();
      })
      .then(() => navigate('/'))
      .catch(err => setError(err.message));
  }

  return (
    <div>
      <h2>Add a New Book</h2>
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
        <button type="submit">Add Book</button>
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
    </div>
  );
}
