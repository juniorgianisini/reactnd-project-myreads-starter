import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import { Line, Circle } from 'rc-progress';

class BookSearch extends Component {

    state = {
        result: [],
        isLoading: false
    }

    handleOnChangeText = event => {
        const value = event.target.value
        
        this.setState(({
            isLoading: true
        }));

        BooksAPI.search(value).then(res => {
            console.log('Result', res)
            this.setState(prevState => ({
                result: !res || res.error ? [] : res,
                isLoading: false
            }));
        })
    }

    //

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
                    {this.state.isLoading && <Line percent="10" strokeWidth="2" strokeColor="#D3D3D3" />}
                    <ol className="books-grid">
                        {this.state.result.map(book => <Book key={book.id} book={book} onChangeBookShelf={this.props.onChangeBookShelf} />)}
                    </ol>
                </div>
            </div>
        );
    }
}

BookSearch.propTypes = {
    onChangeBookShelf: PropTypes.func.isRequired
};

export default BookSearch;