const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/books.json');

const getBooks = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const saveBooks = (books) => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf8');
};

const findBookById = (id) => {
  const books = getBooks();
  return books.find(book => book.id === id);
};

const generateId = () => {
  const books = getBooks();
  if (books.length === 0) return 1;
  const lastBook = books[books.length - 1];
  return lastBook.id + 1;
};

module.exports = {
  getBooks,
  saveBooks,
  findBookById,
  generateId,
};