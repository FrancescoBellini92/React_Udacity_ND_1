import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { BookShelf } from './components/BookShelf';
class BooksApp extends React.Component {

  getBookshelves() {
    return [
      {
        title: 'Currently Reading',
        id: 'Currently Reading',
        books: this.getBooksForShelf('Currently Reading')
      },
      {
        title: 'Read',
        id: 'To read',
        books: this.getBooksForShelf('To read')
      }
    ]
  }

  getBooksForShelf(shelfId) {
    return  shelfId === 'Currently Reading' ? [
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        imageUrl: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
        id: `To Kill a Mockingbird__Harper Lee`,
      },
      {
        title: 'The Silmarillion',
        author: 'J. R. R. Tolkien',
        imageUrl: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
        id: `The Silmarillion__J. R. R. Tolkien`,
      }
    ] : []
  }


  state = {
    showSearchPage: false,
    bookShelves: this.getBookshelves()
  }

  moveToFn = ($event, bookId) => {
    console.log($event.target.value)
    const sourceShelf = this.state.bookShelves.find(i => i.books.find(e => e.id === bookId));
    const targetBook = sourceShelf.books.find(i => i.id === bookId);
    const targetShelf = this.state.bookShelves.find(i => i.title.toLowerCase() === $event.target.value)

    sourceShelf.books = sourceShelf.books.filter(i => i.id !== targetBook.id);
    targetShelf.books = targetShelf.books.concat(targetBook);
    this.setState(prevState => ({bookShelves: [...prevState.bookShelves]}))
    console.log(sourceShelf, targetBook, targetShelf)
  }



  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {this.state.bookShelves.map(i =><div key={i.id}><BookShelf title={i.title} books={i.books} moveToFn={this.moveToFn}></BookShelf></div>)}
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
      )
    }
  </div>
  )}

}

export default BooksApp
