/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable no-empty */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable semi */
/* eslint-disable eol-last */
const {
  nanoid
} = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount
  const checkReadPage = readPage <= pageCount

  if (name !== undefined && checkReadPage === true) {
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      insertedAt,
      finished
    }
    books.push(newBook)
    const isSuccess = books.filter((book) => book.id === id).length > 0
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      })
      response.code(201)
      return response
    }
  }

  const response = h.response({
    status: 'fail',
    message: name === undefined ? 'Gagal menambahkan buku. Mohon isi nama buku' : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
  });
  response.code(400);
  return response;
}

const getAllBooks = (response, h) => {
  const { name, reading, finished } = request.query

  if (name) {
    const spesificBook = name.toLowerCase()

    const response = h.response({
      status: 'success',
      data: {
        book: books
          .filter((n) => n.name === spesificBook)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (reading === '1') {
    const response = h.response({
      status: 'success',
      data: {
        book: books
          .filter((r) => r.reading === true)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (reading === '0') {
    const response = h.response({
      status: 'success',
      data: {
        book: books
          .filter((r) => r.reading === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (finished === '1') {
    const response = h.response({
      status: 'success',
      data: {
        book: books
          .filter((f) => f.finished === true)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (finished === '0') {
    const response = h.response({
      status: 'success',
      data: {
        book: books
          .filter((f) => f.finished === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  const res = h.response({
    status: 'success',
    data: {
      book: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  response.code(200)
  return response
};

const getBookById = (request, h) => {
  const {
    id
  } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      },
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const {
    id
  } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(404);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt

  const searchId = books.findIndex((book) => book.id === id)[0];

  if (searchId !== -1) {
    books[searchId] = {
      ...books[searchId],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      insertedAt,
      updatedAt
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const searchId = books.findIndex((book) => book.id === id)[0];

  if (searchId !== -1) {
    books.splice(searchId, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById
};