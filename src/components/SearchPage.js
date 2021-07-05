import React from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import { Book } from './Book';

export class SearchPage extends React.Component {

	state = {
		searchText: '',
		books: []
	}


	async search($event) {
		const searchText = $event.target.value;
		this.setState({searchText});

		const hasMinimunLength = searchText.length > 3;
		if (hasMinimunLength) {
			this.getData();
		}
	}

	async getData() {
		this.props.showSpinnerFn(true);

		const books = await search(this.state.searchText);
		const hasResults = books instanceof Array;

		this.setState((state, props) => ({books: hasResults ? books.filter(b => !!b.imageLinks?.thumbnail): []}));
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
					<p class="empty-search-text">{!!this.state.searchText ? 'No results' : 'Try searching some books'}</p>
				)}
			</div>
		</div>
	)}
}

