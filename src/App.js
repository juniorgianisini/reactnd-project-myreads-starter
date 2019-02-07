import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(({
        books: books
      }))
    })
  }

  handleChangeBookShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(res => {
      if (res && !res.error) {
        this.setState(prevState => ({
          books: prevState.books.filter(stBook => stBook.id !== book.id).concat(book)
        }));
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf shelfId="currentlyReading" shelfTitle="Currently Reading" books={this.state.books} onChangeBookShelf={this.handleChangeBookShelf} />
              <BookShelf shelfId="wantToRead" shelfTitle="Want to Read" books={this.state.books} onChangeBookShelf={this.handleChangeBookShelf} />
              <BookShelf shelfId="read" shelfTitle="Read" books={this.state.books} onChangeBookShelf={this.handleChangeBookShelf} />
            </div>
          </div>
          <div className="open-search">
            <Link
              to='/search'>
              Add a book
                </Link>
          </div>
        </div>)} />
        <Route path="/search" render={() => (<BookSearch onChangeBookShelf={this.handleChangeBookShelf} />)} />
      </div>
    )
  }
}

export default BooksApp
