import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Book } from './Book';
import { store } from '../store/Store';
import { searchBooks } from '../store/actions';

export class SearchPage extends React.Component {


	static propTypes = {
		currentBooks: PropTypes.arrayOf(PropTypes.object),
	};

	debounceTimer;

	storeSubscription;

	constructor(props) {
		super(props);
		this.state = {
			searchedText: store.state.searchedText,
			searchedBooks: store.state.searchedBooks
		}
	}

	componentDidMount() {
		this.storeSubscription = store.subscribe(({searchedText, searchedBooks}) => this.setState({searchedText, searchedBooks}));
	}

	componentWillUnmount() {
    this.storeSubscription.unsubscribe();
  }


	async search($event) {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}

		const searchedText = $event.target.value;
		this.debounceTimer = setTimeout(() => store.dispatch(searchBooks(searchedText)), 500);
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
				{this.state.searchedBooks.length > 0 && (
					<ol className="books-grid">
						{this.state.searchedBooks.map(book => (
							<li key={book.id}>
									<Book book={this.getCurrentBook(book.id) || book}>
									</Book>
							</li>
						))}
						</ol>
				)}

				{this.state.searchedBooks.length === 0 && (
					<p className="empty-search-text">{!!this.state.searchedText ? 'No results' : 'Try searching some books'}</p>
				)}
			</div>
		</div>
	)}
}

