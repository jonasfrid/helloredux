"use strict"

// CART reducers
export function cartReducers(state={cart:[]}, action) {
  switch (action.type){
    case "GET_CART":
    return{
      ...state,
      cart:action.payload,
      totalAmount:totals(action.payload).amount,
      totalQty:totals(action.payload).qty
    }
    case "ADD_TO_CART":
      return {...state,
        cart:action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;
    case "UPDATE_CART":
      console.log("UPDATE_CART",...state);
      console.log("UPDATE_CART",action);
      return {...state,
        cart:action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;
    case "DELETE_CART_ITEM":
      return {...state,
        cart:action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;
  }
  return state;
}

// Calculate totals
export function totals(payloadArr){
  const totalAmount = payloadArr.map(function(cartArr){
    return cartArr.price * cartArr.quantity;
  }).reduce(function(a,b){
    return a + b;
  }, 0); // start summing up from index 0

  const totalQty = payloadArr.map(function(qty){
    return qty.quantity;
  }).reduce(function(a,b){
    return a + b;
  }, 0);

  return {
    amount:totalAmount.toFixed(2),
    qty:totalQty
  }
}
