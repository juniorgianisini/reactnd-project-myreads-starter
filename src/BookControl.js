import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookControl extends Component {

    state = {
        book: {}
    }

    handleOnChangeBookShelf = (event) => {
        const newShelf = event.target.value
        this.setState(prevState => ({
            book: { ...prevState.book, shelf: newShelf }
        }))
        this.props.onChangeBookShelf(this.state.book, newShelf)
    }

    componentDidMount() {
        const { book } = this.props
        if (!book.shelf) {
            BooksAPI.get(book.id).then(res => {
                if (res && !res.error) {
                    this.setState(({
                        book: res
                    }))
                }
            })
        } else {
            this.setState(({
                book: book
            }))
        }
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={this.handleOnChangeBookShelf} value={this.state.book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
};

BookControl.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
};

export default BookControl;