import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = props => {

    const {shelfId, shelfTitle, books} = props
    const shelfBooks = books.filter(book => book.shelf === shelfId)

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfBooks.map(book => (<li key={book.id}><Book book={book}/></li>))}
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    shelfId: PropTypes.string.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
};

export default BookShelf;