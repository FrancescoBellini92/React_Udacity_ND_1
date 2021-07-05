import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getAll, update } from '../BooksAPI';
import { HomePage } from './HomePage';
import { SearchPage } from './SearchPage';
import { Spinner } from './Spinner';

import '../styles/App.css';


class BooksApp extends React.Component {

  state = {
    showSpinner: false,
    shelves: [],
    books: []
  };

  async componentDidMount() {
    await this._getData();
  }

  async _getData() {
    this.setState((state, props) => ({showSpinner : true}));
    const books = await getAll();
    const shelves = [...new Set(books.map(b => b.shelf))];
    this.setState((state, props) => ({ books, shelves, showSpinner: false }));
  }

  moveToShelfFn = async ($event, book) => {
    const shelf = ($event.target.value)
    await update(book, shelf);
    this._getData();
  }

  toggleSpinner = showSpinner => this.setState({showSpinner});

  render() { return (
      <BrowserRouter>
        <div className="app">
          {this.state.showSpinner && (<Spinner></Spinner>)}
        <Switch>

          <Route path="/search">
            <SearchPage currentBooks={this.state.books} saveBookFn={this.moveToShelfFn} showSpinnerFn={this.toggleSpinner}></SearchPage>
          </Route>

          <Route path="/">
            <HomePage shelves={this.state.shelves} books={this.state.books} moveToFn={this.moveToShelfFn}></HomePage>
          </Route>

        </Switch>

      </div>
    </BrowserRouter>
  )}

}

export default BooksApp
