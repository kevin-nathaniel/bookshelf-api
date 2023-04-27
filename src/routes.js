/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable key-spacing */
/* eslint-disable semi */
/* eslint-disable eol-last */
const {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById
} = require('./handler');

const routes = [{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Homepage';
    },
  },

  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },

  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookById,
  },

  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

module.exports = routes;