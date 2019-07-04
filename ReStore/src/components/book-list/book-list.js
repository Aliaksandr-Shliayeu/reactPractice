import React, { Component, Fragment } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import Spinner from "../spinner";
import { withBookstoreService } from "../hoc";
import { booksLoaded, booksRequested, booksError } from "../../actions";
import { compose } from "../../utils";
import ErrorIndicator from "../error-indicator";

import "./book-list.css";

class BookList extends Component {
  componentDidMount() {
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError
    } = this.props;
    booksRequested();
    bookstoreService
      .getBooks()
      .then(data => {
        booksLoaded(data);
      })
      .catch(error => {
        booksError(error);
      });
  }

  render() {
    const { books, isLoading, error } = this.props;
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
    return (
      <ul className="book-list">
        {books.map(book => {
          return (
            <li key={book.id}>
              <BookListItem book={book} />
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = ({ books, isLoading, error }) => {
  return { books, isLoading, error };
};

const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookList);
