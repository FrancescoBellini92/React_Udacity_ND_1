import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getAll, update } from '../BooksAPI';
import { HomePage } from './HomePage';
import { SearchPage } from './SearchPage';
import { Spinner } from './Spinner';

import '../styles/App.css';


const BooksApp =  () => {

  const [showSpinner, setShowSpinner] = useState();
  const [shelves, setShelves] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let mounted = true;

    setShowSpinner(true);
    getData().then(() => mounted && setShowSpinner(false))

    return () => mounted = false;
  }, []);


  const getData = async () => {
    const books = await getAll();
    const shelves = [...new Set(books.map(b => b.shelf))];
    setBooks(books)
    setShelves(shelves);
  }

  const moveToShelf = async ($event, book) => {
    setShowSpinner(true);
    const shelf = ($event.target.value)
    await update(book, shelf);
    await getData();
    setShowSpinner(false)

  }

  return (
      <BrowserRouter>
        <div className="app">
          {showSpinner && (<Spinner></Spinner>)}
        <Switch>

          <Route path="/search">
            <SearchPage currentBooks={books} moveToShelf={moveToShelf} showSpinner={setShowSpinner}></SearchPage>
          </Route>

          <Route path="/">
            <HomePage shelves={shelves} books={books} moveToShelf={moveToShelf}></HomePage>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default BooksApp
