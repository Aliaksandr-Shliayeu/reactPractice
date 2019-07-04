import BookListItem from "../book-list-item";
import React, { Component } from "react";
import { compose } from "./../../utils";
import { booksLoaded } from "../../actions";
import { connect } from "react-redux";
import { withBookstoreService } from "./../hoc";

import "./book-list.css";

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();
    this.props.booksLoaded(data);
  }
  render() {
    const { books } = this.props;

    return (
      <ul>
        {books.map(item => (
          <li key={item.id}>
            <BookListItem item={item} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return {
    books
  };
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
