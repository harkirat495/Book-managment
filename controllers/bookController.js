const { getBooks, saveBooks, findBookById, generateId } = require('../utils/bookUtils.js');
const { validationResult } = require('express-validator');


exports.createBook = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, author, genre, publicationYear, imageUrl, isbn, description } = req.body;
  const books = getBooks();

  if (books.some(book => book.isbn === isbn)) return res.status(400).json({ message: 'Book with this ISBN already exists' });

  const newBook = {
    id: generateId(),
    title,
    author,
    genre,
    publicationYear,
    imageUrl: imageUrl || 'https://example.com/placeholder-image.png',
    isbn,
    description,
  };

  books.push(newBook);
  saveBooks(books);

  res.status(201).json(newBook);
};


exports.getBooks = (req, res) => {
  const { author, genre, publicationYear } = req.query;
  let books = getBooks();

  if (author) books = books.filter(book => book.author === author);
  if (genre) books = books.filter(book => book.genre === genre);
  if (publicationYear) books = books.filter(book => book.publicationYear === parseInt(publicationYear));

  res.status(200).json(books);
};

exports.getBookById = (req, res) => {
  const book = findBookById(parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
};

exports.updateBook = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 

  const { title, author, genre, publicationYear, imageUrl, isbn, description } = req.body;
  const books = getBooks();

  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  const updatedBook = {
    id: parseInt(req.params.id),
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
    genre: genre || books[bookIndex].genre,
    publicationYear: publicationYear || books[bookIndex].publicationYear,
    imageUrl: imageUrl || books[bookIndex].imageUrl,
    isbn: isbn || books[bookIndex].isbn,
    description: description || books[bookIndex].description,
  };

  books[bookIndex] = updatedBook;
  saveBooks(books);

  res.status(200).json(updatedBook);
};

exports.deleteBook = (req, res) => {
  const books = getBooks();
  const newBooks = books.filter(book => book.id !== parseInt(req.params.id));

  if (books.length === newBooks.length) return res.status(404).json({ message: 'Book not found' });

  saveBooks(newBooks);
  res.status(200).json({ message: 'Book deleted successfully' });
};