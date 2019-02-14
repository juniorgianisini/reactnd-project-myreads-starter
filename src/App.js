import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import Loading from './Loading'

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoading: false
  }

  componentDidMount() {
    this.changeLoadingGlobal(true)
    BooksAPI.getAll().then(books => {
      this.updateState(false, books)
    })
  }

  /**
  * @description Trocar o livro de estante
  * @param {Object} book
  * @param {string} shelf
  */
  handleChangeBookShelf = (book, shelf) => {
    book.shelf = shelf
    this.changeLoadingGlobal(true)
    BooksAPI.update(book, shelf).then(res => {
      if (res && !res.error) {
        this.updateState(false, this.state.books.filter(stBook => stBook.id !== book.id).concat(book))
      }
    })
  }

  /**
  * @description Atualizar o estado do componente
  * @param {boolean} status
  * @param {Object} books
  */
  updateState = (status, books) => {
    this.setState(prevState => ({
      isLoading: status,
      books: books || prevState.books
    }));
  }

  /**
  * @description Função global para definir a tela para estado 'Loading'
  * @param {boolean} status
  */
  changeLoadingGlobal = (status) => {
    this.updateState(status)
  }

  render() {
    return (
      <div className="app">
        <div className="loading-global">
          {this.state.isLoading &&
            <Loading height="40px" width="40px" />
          }
        </div>
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
        <Route path="/search" render={() => (<BookSearch onChangeBookShelf={this.handleChangeBookShelf} changeLoadingGlobal={this.changeLoadingGlobal} />)} />
      </div>
    )
  }
}

export default BooksApp
