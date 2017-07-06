"use strict"
import {createStore} from 'redux';

// STEP 3 define reducers
const reducer = function(state={books:[]}, action){
  switch(action.type){

    case "POST_BOOK":
    //let books = state.books.concat(action.payload);
    //return {books};
    return {books:[...state.books, ...action.payload]}
    break;

    case "DELETE_BOOK":
    // Create a copy of the current array of books
    const currentBookToDelete = [...state.books];
    // Determine at which index in books array the book to be deleted is
    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        return book.id === action.payload.id;
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
        return book.id === action.payload.id;
      }
    )
    // Create a new object with the new values adn the same array index
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
// STEP 1 Create the store
const store = createStore(reducer);

store.subscribe(function(){
  console.log('current state is: ', store.getState());
  //console.log('current price: ', store.getState()[1].price);
})

// STEP 2 create and dispatch actions
store.dispatch({
  type:"POST_BOOK",
  payload: [{
    id: 1,
    title: 'book title',
    description: 'book description',
    price: 33.33
  },
  {
    id: 2,
    title: 'book title 2',
    description: 'book description 2',
    price: 50
  }]
});

// DELETE a book
store.dispatch({
  type:"DELETE_BOOK",
  payload: {id: 1}
});

// UPDATE a book
store.dispatch({
  type:"UPDATE_BOOK",
  payload: {
    id: 2,
    title: 'new title'
  }
});
