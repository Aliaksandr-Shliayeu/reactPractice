import React, { Fragment } from "react";
import './book-list-item.css'

const BookListItem = ({ item }) => {
  const { title, author } = item;
  return (
    <Fragment>
      <span>{title}</span>
      <span>{author}</span>
    </Fragment>
  );
};

export default BookListItem;
