import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component {

    state = {
        result: []
    }

    /**
     * @description Evento disparado ao alterar o valor do campo de pesquisa
     * @param {event} event
     */
    handleOnChangeText = event => {
        const value = event.target.value
        this.props.changeLoadingGlobal(true)
        BooksAPI.search(value).then(res => {
            this.setState({
                result: !res || res.error ? [] : res
            }, () => this.props.changeLoadingGlobal(false))
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleOnChangeText} />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.result.map(book => <Book key={book.id} book={book} onChangeBookShelf={this.props.onChangeBookShelf} />)}
                    </ol>
                </div>
            </div>
        );
    }
}

BookSearch.propTypes = {
    onChangeBookShelf: PropTypes.func.isRequired,
    changeLoadingGlobal: PropTypes.func.isRequired
};

export default BookSearch;