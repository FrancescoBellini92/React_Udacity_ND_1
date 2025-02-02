import React from "react"
import PropTypes from 'prop-types'

export const Book = ({book, moveToShelf}) => (
	<div className="book">
		<div className="book-top">
			<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}`}}>
			</div>
				<div className="book-shelf-changer">
					<select value={book.shelf || 'none'} onChange={$event => moveToShelf ? moveToShelf($event, book) : null}>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
						</select>
					</div>
				</div>
			<div className="book-title">{book.title}</div>
		<div className="book-authors">
			{book.authors?.map(author => <span key={author}>{author}</span>)}
		</div>
	</div>
)

Book.propTypes = {
	book: PropTypes.object,
	moveToShelf: PropTypes.func
};