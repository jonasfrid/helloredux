"use strict"

// BOOKS reducers
export function booksReducers(state={
  books: []
  }, action){
  switch(action.type){

    case "GET_BOOKS":
    //let books = state.books.concat(action.payload);
    //return {books};
    return {...state, books:[...action.payload]}
    break;

    case "POST_BOOK":
    console.log("SAVED BOOK");
    return {books:[...state.books, ...action.payload], msg: 'Saved! Click to continue.', style:'success', validation:'success'}
    break;

    case "POST_BOOK_REJECTED":
    return {...state, msg:'Please try again', style:'danger', validation:'error'}
    break;

    case "RESET_BUTTON":
    return {...state, msg:null, style:'primary', validation:null}
    break;

    case "DELETE_BOOK":
    // Create a copy of the current array of books
    const currentBookToDelete = [...state.books];
    // Determine at which index in books array the book to be deleted is
    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        return book._id == action.payload;
      }
    )
    //use slice to remove the book at the specified index
    return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":
    // Create a copy of the current array of books
    const currentBookToUpdate = [...state.books]
    // Determine at which index in books array the book to be updated is
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book._id === action.payload._id;
      }
    )
    // Create a new object with the new values and the same array index
    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }

    console.log("newBookToUpdate", newBookToUpdate);

    // use slice to remove the old book, repace with the new one
    return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)]}

    break;
  }
  return state;
}
