import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import { Book } from './Book';
import PropTypes from 'prop-types';

export const SearchPage = ({currentBooks, showSpinner, moveToShelf }) => {

	const [searchText, setSearchText] = useState('');
	const [books, setBooks] = useState([]);

	const getData = async (searchString) => {
		showSpinner(true);

		const books = await search(searchString);
		const hasResults = books instanceof Array;
		setBooks( hasResults ? books.filter(b => !!b.imageLinks?.thumbnail): [])

		showSpinner(false);
	}

	const debouncedGetData = useDebounce(getData, 200);
	const onSearch = async ($event) => {
		const newSearchText = $event.target.value;
		setSearchText(newSearchText)

		debouncedGetData(newSearchText);
	}

	const getCurrentBook = (bookId) => currentBooks.find(book => book.id === bookId);

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/">
					<button className="close-search" >Close</button>
				</Link>
				<div className="search-books-input-wrapper">
					<input type="text" placeholder="Search by title or author" value={searchText} onChange={onSearch}/>
				</div>
			</div>

			<div className="search-books-results">
				{books.length > 0 && (
					<ol className="books-grid">
						{books.map(book => (
							<li key={book.id}>
									<Book book={getCurrentBook(book.id) || book} moveToShelf={moveToShelf}>
									</Book>
							</li>
						))}
						</ol>
				)}

				{books.length === 0 && (
					<p className="empty-search-text">{!!searchText ? 'No results' : 'Try searching some books'}</p>
				)}
			</div>
		</div>
	)
}

SearchPage.propTypes = {
	currentBooks: PropTypes.array,
	showSpinner: PropTypes.func,
	moveToShelf: PropTypes.func
};


const useDebounce = (callback, timeout) => {
	const ref = useRef();

	const debounced = useCallback((...args) => {
		if (ref.current) {
			clearTimeout(ref.current)
		}
		ref.current = setTimeout(() => callback(...args), timeout)
	}, [callback, timeout])

	return debounced
}