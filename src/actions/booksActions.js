"use strict"
import axios from 'axios';

// GET books
export function getBooks(){
  return function(dispatch){
    axios.get("/api/books")
      .then(function(response){
        dispatch({type:"GET_BOOKS", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_BOOKS_REJECTED",payload:err})
      })
  }
}

// POST a book
export function postBooks(book){
  return function(dispatch){
    axios.post("/api/books", book)
      .then(function(response){
        dispatch({type:"POST_BOOK", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"POST_BOOK_REJECTED", payload:"there was an error while creating a new book"})
      })
  }
}

// DELETE a book
export function deleteBooks(id){
  return function(dispatch){
    axios.delete("/api/books/" + id)
      .then(function(response){
        dispatch({type:"DELETE_BOOK", payload:id})
      })
      .catch(function(err){
        dispatch({type:"DELETE_BOOK_REJECTED", payload:err})
      })
  }
}

// UPDATE a book
export function updateBooks(book){
  return {
    type:"UPDATE_BOOK",
    payload: book
  }
}


// Reset form button
export function resetButton(book){
  return {
    type:"RESET_BUTTON"
  }
}
