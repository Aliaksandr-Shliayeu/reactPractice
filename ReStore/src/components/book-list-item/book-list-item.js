import React, { Fragment } from "react";
import './book-list-item.css'

const BookListItem = ({ item }) => {
  const { title, autor } = item;
  return (
    <Fragment>
      <span>{title}</span>
      <span>{autor}</span>
    </Fragment>
  );
};

export default BookListItem;
