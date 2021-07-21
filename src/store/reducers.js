import { GET_BOOKS, SEARCH_BOOKS, SHOW_LOADER } from "./actions";

export function reducer(action, {books = [], searchedBooks = [], searchedText = ''}) {
  return {
    showSpinner: loadingReducer(action),
    shelves: shelvesReducer(action, books),
    books: booksReducer(action, books),
    searchedText: searcheTextReducer(action, searchedText),
    searchedBooks: searchedBooksReducer(action, searchedBooks)
  }
}

function shelvesReducer(action, books = []) {
  switch(action.type) {
    case GET_BOOKS:
      return [...new Set(action.books.map(b => b.shelf))];
    default:
      return [...new Set(books.map(b => b.shelf))];;
  }
}

function loadingReducer(action) {
  switch(action.type) {
    case SHOW_LOADER:
      return true;
    default:
      return false;
  }
}

function booksReducer(action, books = []) {
  switch(action.type) {
    case GET_BOOKS:
      return action.books;
    default:
      return books;
  }
}

function searchedBooksReducer(action, books = []) {
  switch(action.type) {
    case SEARCH_BOOKS:
      return action.searchedBooks;
    default:
      return books;
  }
}

function searcheTextReducer(action, searchedText = '') {
  switch(action.type) {
    case SEARCH_BOOKS:
      return action.searchedText;
    default:
      return searchedText;
  }
}