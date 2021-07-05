import  React  from 'react';
import { Link } from 'react-router-dom';
import { BookShelf } from './BookShelf';

export const HomePage = ({shelves, books, moveToFn}) => (
	<div className="list-books">
		<div className="list-books-title">
			<h1>MyReads</h1>
		</div>
		<div className="list-books-content">
			{shelves.map(shelf => (
				<div key={shelf}>
					<BookShelf shelf={shelf} books={books.filter(book => book.shelf === shelf)} moveToFn={moveToFn} />
				</div>
			))}
		</div>
		<div className="open-search">
			<Link to="/search">
				<button>Add a book</button>
			</Link>
		</div>
	</div>
);
