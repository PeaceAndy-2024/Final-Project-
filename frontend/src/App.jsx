import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';


import Home from './pages/Home';
import BookDetails from './pages/BookDetails';

import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/add-book">Add Book</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
}
