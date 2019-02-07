import React from 'react';
import PropTypes from 'prop-types';
import BookControl from './BookControl';

const Book = props => {

    const { book, onChangeBookShelf } = props

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")` }}></div>
                <BookControl book={book} onChangeBookShelf={onChangeBookShelf} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
};

export default Book;