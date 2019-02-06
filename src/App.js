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
        console.log('Books', books)
        this.setState(prevState => ({
          books: books
        }))
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
                <BookShelf shelfId="currentlyReading" shelfTitle="Currently Reading" books={this.state.books} />
                <BookShelf shelfId="wantToRead" shelfTitle="Want to Read" books={this.state.books} />
                <BookShelf shelfId="read" shelfTitle="Read" books={this.state.books} />
              </div>
            </div>
            <div className="open-search">
                <Link 
                    to='/search'>
                    Add a book
                </Link>
            </div>
          </div>)} /> 
          <Route path="/search" component={BookSearch}/>
      </div>
    )
  }
}

export default BooksApp
