import React from 'react';
import BookList from '../components/BookList';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Online Bookstore</h1>
      <p>Start browsing and buying your favorite books!</p>
      <BookList />
    </div>
  );
}
