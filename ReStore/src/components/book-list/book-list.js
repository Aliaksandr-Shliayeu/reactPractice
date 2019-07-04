import React, { Component, Fragment } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import Spinner from "../spinner";
import { withBookstoreService } from "../hoc";
import { fetchBooks } from "../../actions";
import { compose } from "../../utils";
import ErrorIndicator from "../error-indicator";

import "./book-list.css";

const BookList = ({ books }) => {
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
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
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
    return <BookList books={books} />;
  }
}

const mapStateToProps = ({ books, isLoading, error }) => {
  return { books, isLoading, error };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return { fetchBooks: fetchBooks(bookstoreService, dispatch) };
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookListContainer);
