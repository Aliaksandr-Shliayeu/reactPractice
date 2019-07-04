import React from "react";
import BookList from "../book-list";

const HomePage = () => {
  const books = [
    {
      id: 1,
      title: "You Don't Know JS: Scope & Closures",
      author: "Kyle Simpson"
    },
    {
      id: 2,
      title: "Production‑Ready Microservices: Building",
      author: "Susan Fowler"
    },
    {
      id: 3,
      title: "Release It!",
      author: "Michael T. Nygard"
    }
  ];
  return <BookList books={books} />;
};

export default HomePage;
