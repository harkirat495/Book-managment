const express = require('express');
const { check } = require('express-validator');
const bookController = require('../controllers/bookController.js');

const router = express.Router();

router.post('/books',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('isbn', 'ISBN is required').isISBN(),
  ],
  bookController.createBook
);

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);

router.put(
  '/books/:id',
  [
    check('isbn', 'Invalid ISBN').optional().isISBN(),
  ],
  bookController.updateBook
);

router.delete('/books/:id', bookController.deleteBook);

module.exports = router;