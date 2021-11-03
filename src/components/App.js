import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './HomePage';
import SearchPage from './SearchPage';
import { Spinner } from './Spinner';
import { store } from '../store/Store';

import {  getBooksRequest, updateBooks } from '../store/actions';
import '../styles/App.css';
import { connect } from './utils/connect';
class BooksApp extends React.Component {

  componentDidMount() {
    this.props.getData();
  }

  moveToShelfFn = async ($event, book) => {
    const shelf = ($event.target.value);
    this.props.updateData(book, shelf);
  }

  render() { return (
      <BrowserRouter>
        <div className="app">
          {this.props.showSpinner && (<Spinner></Spinner>)}
        <Switch>

          <Route path="/search">
            <SearchPage></SearchPage>
          </Route>

          <Route path="/">
            <HomePage shelves={this.props.shelves} books={this.props.books}></HomePage>
          </Route>

        </Switch>

      </div>
      </BrowserRouter>
  )}
}

const ConnectedBooskApp = connect(
  {showSpinner : 'showSpinner', books: 'books', shelves: 'shelves'},
  {getData: () => store.dispatch(getBooksRequest()), updateData: (book, shelf) => store.dispatch(updateBooks(book, shelf))})
  (BooksApp);

export default ConnectedBooskApp
