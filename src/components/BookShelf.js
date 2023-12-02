import React from 'react';
import { Book } from './Book';
import PropTypes from 'prop-types';

const shelvesMap = {
	currentlyReading: 'Currently reading',
	wantToRead: 'Want to read',
	read: 'Read'
}

export const BookShelf = ({shelf, books, moveToShelf}) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{shelvesMap[shelf]}</h2>
		<div className="bookshelf-books">
			<ol className="books-grid">
				{books.map(book => <li key={book.id}><Book book={book} moveToShelf={moveToShelf}></Book></li>)}
			</ol>
		</div>
	</div>
)

BookShelf.propTypes = {
	shelf: PropTypes.string,
	books: PropTypes.array,
	moveToShelf: PropTypes.func
};