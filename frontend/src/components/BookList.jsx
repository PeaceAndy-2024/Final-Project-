
export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/books')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{marginBottom: '1rem', padding: '0.5rem', width: '100%'}}
      />
      <ul>
        {filteredBooks.length === 0 ? (
          <li>No books found.</li>
        ) : (
          filteredBooks.map(book => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>
                <strong>{book.title}</strong>
              </Link> by {book.author} - ${book.price}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
