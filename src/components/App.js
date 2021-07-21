import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './HomePage';
import { SearchPage } from './SearchPage';
import { Spinner } from './Spinner';
import { store } from '../store/Store';

import {  getBooksRequest, updateBooks } from '../store/actions';
import '../styles/App.css';

class BooksApp extends React.Component {

  state;

  storeSubscription;

  constructor(props) {
    super(props);
    this.state = {
      ...store.state
    };
  }


  async componentDidMount() {
    this.storeSubscription = store.subscribe(state => {

      this.setState(state)
    });
    await this._getData();
  }

  componentWillUnmount() {
    this.storeSubscription.unsubscribe();
  }

  async _getData() {
    store.dispatch(getBooksRequest());
  }

  moveToShelfFn = async ($event, book) => {
    const shelf = ($event.target.value);
    store.dispatch(updateBooks(book, shelf))
  }

  toggleSpinner = showSpinner => this.setState({showSpinner});

  render() { return (
      <BrowserRouter>
        <div className="app">
          {this.state.showSpinner && (<Spinner></Spinner>)}
        <Switch>

          <Route path="/search">
            <SearchPage currentBooks={this.state.books}></SearchPage>
          </Route>

          <Route path="/">
            <HomePage shelves={this.state.shelves} books={this.state.books}></HomePage>
          </Route>

        </Switch>

      </div>
    </BrowserRouter>
  )}

}

export default BooksApp
