import React, { Component, Fragment } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import Spinner from "../spinner";
import { fetchBooks, bookAddedToCart } from "../../actions";
import { withBookstoreService } from "../hoc";
import { compose } from "../../utils";
import ErrorIndicator from "../error-indicator";

import "./book-list.css";

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => {
                onAddedToCart(book.id);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, isLoading, error, onAddedToCart } = this.props;
    if (error) {
      return (
        <Fragment>
          <ErrorIndicator />
        </Fragment>
      );
    }
    if (isLoading) {
      return (
        <Fragment>
          <Spinner />
          <h1>Loading .....</h1>
        </Fragment>
      );
    }
    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = ({ books, isLoading, error }) => {
  return { books, isLoading, error };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: id => dispatch(bookAddedToCart(id))
  };
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookListContainer);
