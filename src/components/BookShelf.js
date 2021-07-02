import React from 'react';
import { Book } from './Book';

export const BookShelf = ({title, books, moveToFn}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(i => <li key={i.id}><Book id={i.id} title={i.title} author={i.author} imageUrl={i.imageUrl} moveToFn={moveToFn}></Book></li>)}
            </ol>
        </div>
    </div>
)