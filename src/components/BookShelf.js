import React from 'react';
import { Book } from './Book';

const shelvesMap = {
	currentlyReading: 'Currently reading',
	wantToRead: 'Want to read',
	read: 'Read'
}

export const BookShelf = ({shelf, books, moveToFn}) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{shelvesMap[shelf]}</h2>
		<div className="bookshelf-books">
			<ol className="books-grid">
				{books.map(book => <li key={book.id}><Book book={book} moveToFn={moveToFn}></Book></li>)}
			</ol>
		</div>
	</div>
)