import { getAll, search, update } from "../BooksAPI";

export const GET_BOOKS = 'GET_BOOKS';
export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const SHOW_LOADER = 'SHOW_LOADER';

export function getBooks(books) {
  return {
    type: GET_BOOKS,
    books
  }
}

export const  getBooksRequest = () => async (dispatch) => {
  dispatch({type: SHOW_LOADER})
  const books = await getAll();
  const action = {
    type: GET_BOOKS,
    books
  };
  dispatch(action)
}

export const updateBooks = (book, shelf) => async (dispatch) => {
  dispatch({type: SHOW_LOADER})
  await update(book, shelf);

  const books = await getAll();
  const action = {
    type: GET_BOOKS,
    books
  };
  dispatch(action)
}

export const searchBooks = (text) => async (dispatch) => {
  dispatch({type: SHOW_LOADER})
  const books = await search(text);
  const hasResults = books instanceof Array;
  const hasText = text.length > 0;
  const action = {
    type: SEARCH_BOOKS,
    searchedText: text,
    searchedBooks: (hasResults && hasText) ? books.filter(b => !!b.imageLinks?.thumbnail): []
  };
  dispatch(action)
}
