
export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    setDeleting(true);
    fetch(`/api/books/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete book');
        return res.json();
      })
      .then(() => navigate('/'))
      .catch(err => {
        setError(err.message);
        setDeleting(false);
      });
  }

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <Link to="/">Back to list</Link> |{' '}
      <Link to={`/edit-book/${book._id}`}>Edit</Link> |{' '}
      <button onClick={handleDelete} disabled={deleting} style={{color:'red'}}>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
