import React from 'react';
import PropTypes from 'prop-types';

const handleOnChangeOption = (event, book) => {
    console.log('Option Value', event.target.value, 'Book', book)
}

const BookControl = props => {
    const {book} = props
    const shelf = book.shelf

    return (
        <div className="book-shelf-changer">
            <select onChange={(event) => handleOnChangeOption(event, book)} value={shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
};

BookControl.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookControl;