import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Loading from './Loading'

class BookControl extends PureComponent {

    state = {
        book: {},
        isLoading: false
    }

    updateState = (status, book) => {
        this.setState(prevState => ({
            book: book || prevState.book,
            isLoading: status
        }))
    }

    changeLoading = status => {
        this.updateState(status)
    }

    handleOnChangeBookShelf = (event) => {
        const newShelf = event.target.value
        this.updateState(false, { ...this.state.book, shelf: newShelf })
        this.props.onChangeBookShelf(this.state.book, newShelf)
    }

    componentDidMount() {
        const { book } = this.props
        if (!book.shelf) {
            this.changeLoading(true)
            BooksAPI.get(book.id).then(res => {
                if (res && !res.error) {
                    this.updateState(false, res)
                }
            })
        } else {
            this.updateState(false, book)
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoading ?
                        <Loading height="30px" width="30px" />
                        :
                        <div className="book-shelf-changer">
                            <select onChange={this.handleOnChangeBookShelf} value={this.state.book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                }
            </div>
        )
    }
};

BookControl.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
};

export default BookControl;