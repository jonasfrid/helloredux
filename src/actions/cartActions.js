"use strict"
import axios from 'axios';

// GET CART
export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
      .then(function(response){
        dispatch({type:"GET_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_CART_REJECTED", msg:"error when getting the cart from session"})
      })
  }
}


// ADD CART
export function addToCart(cart){
  return function(dispatch){
    console.log("addToCart",cart);
    axios.post("/api/cart", cart)
      .then(function(response){
        console.log("response",response);
        dispatch({type:"ADD_TO_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
      })
  }
}

// UPDATE CART
export function updateCart(_id, unit, cart){
  // Create a copy of the current array of books
  const currentBookToUpdate = cart;
  console.log("currentBookToUpdate",currentBookToUpdate);
  // Determine at which index in books array the book to be updated is
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book){
      console.log("book",book);
      return book._id === _id;
    }
  )

  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]

  return function(dispatch){
    axios.post("/api/cart", cartUpdate)
      .then(function(response){
        dispatch({type:"UPDATE_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when updating the cart'})
      })
  }

}

// DELETE FROM CART
export function deleteCartItem(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        console.log("response",response);
        dispatch({type:"DELETE_CART_ITEM", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'error when deleting cart item'})
      })
  }
}
