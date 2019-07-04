import React, { Component, Fragment } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import Spinner from "../spinner";
import { withBookstoreService } from "../hoc";
import { booksLoaded } from "../../actions";
import { compose } from "../../utils";

import "./book-list.css";

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService, booksLoaded } = this.props;
    bookstoreService.getBooks().then(data => {
      booksLoaded(data);
    });
  }

  render() {
    const { books, isLoading } = this.props;
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

const mapStateToProps = ({ books, isLoading }) => {
  return { books, isLoading };
};

const mapDispatchToProps = {
  booksLoaded
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookList);
