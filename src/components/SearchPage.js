import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import { Book } from './Book';

export class SearchPage extends React.Component {

	static propTypes = {
		currentBooks: PropTypes.arrayOf(PropTypes.object),
		showSpinnerFn: PropTypes.func,
		saveBookFn: PropTypes.func
	};

	state = {
		searchText: '',
		books: []
	}


	async search($event) {
		const searchText = $event.target.value;
		this.setState({searchText});

		const hasMinimunLength = searchText.length > 0;
		if (hasMinimunLength) {
			this.getData(searchText);
		} else {
			this.setState({books: []});
		}
	}

	async getData(text) {
		this.props.showSpinnerFn(true);

		const books = await search(text);
		const hasResults = books instanceof Array;
		const hasText = this.state.searchText.length > 0

		this.setState((state, props) => ({books: (hasResults && hasText) ? books.filter(b => !!b.imageLinks?.thumbnail): []}));
		this.props.showSpinnerFn(false);
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
					<input type="text" placeholder="Search by title or author" value={this.state.searchText} onChange={$event => this.search($event)}/>
				</div>
			</div>

			<div className="search-books-results">
				{this.state.books.length > 0 && (
					<ol className="books-grid">
						{this.state.books.map(book => (
							<li key={book.id}>
									<Book book={this.getCurrentBook(book.id) || book} moveToFn={this.props.saveBookFn}>
									</Book>
							</li>
						))}
						</ol>
				)}

				{this.state.books.length === 0 && (
					<p className="empty-search-text">{!!this.state.searchText ? 'No results' : 'Try searching some books'}</p>
				)}
			</div>
		</div>
	)}
}

