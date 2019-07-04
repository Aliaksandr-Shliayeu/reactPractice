const initialState = {
  books: [],
  isLoading: true,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOKS_REQUESTED":
      return { books: [], isLoading: true, error: null };
    case "BOOKS_ERROR":
      return { books: [], isLoading: false, error: action.payload };
    case "BOOKS_LOADED":
      return {
        books: action.payload,
        isLoading: false,
        error: null
      };

    default:
      return state;
  }
};

export default reducer;
