import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from './Book';
import { store } from '../store/Store';
import { searchBooks } from '../store/actions';
import { connect } from './utils/connect';

class SearchPage extends React.Component {

	debounceTimer;

	async search($event) {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}

		const searchedText = $event.target.value;
		this.debounceTimer = setTimeout(() => this.props.search(searchedText), 500);
	}

	getCurrentBook(bookId) {
		return this.props.currentBooks.find(book => book.id === bookId);
	}

	render() { return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/">
					<button className="close-search" >Close</button>
				</Link>
				<div className="search-books-input-wrapper">
					<input type="text" placeholder="Search by title or author" onChange={$event => this.search($event)}/>
				</div>
			</div>

			<div className="search-books-results">
				{this.props.searchedBooks.length > 0 && (
					<ol className="books-grid">
						{this.props.searchedBooks.map(book => (
							<li key={book.id}>
									<Book book={this.getCurrentBook(book.id) || book}>
									</Book>
							</li>
						))}
						</ol>
				)}

				{this.props.searchedBooks.length === 0 && (
					<p className="empty-search-text">{!!this.props.searchedText ? 'No results' : 'Try searching some books'}</p>
				)}
			</div>
		</div>
	)}
}


const ConnectedSearchPage = connect({
	currentBooks: 'books',
	searchedText: 'searchedText',
	searchedBooks: 'searchedBooks',
	},
	{search: searchedText => store.dispatch(searchBooks(searchedText))})
	(SearchPage);

export default ConnectedSearchPage;