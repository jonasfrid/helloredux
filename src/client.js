"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router'


import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

// Import combined reducers
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'

// STEP 1 Create the store
const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}/>
        <Route path="/admin" component={BooksForm}/>
        <Route path="/cart" component={Cart}/>
      </Route>
    </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);

// STEP 2 create and dispatch actions
// store.dispatch(postBooks(
//   [{
//     id: 1,
//     title: 'book 1',
//     description: 'description 1',
//     price: 10
//   },
//   {
//     id: 2,
//     title: 'book 2',
//     description: 'description 2',
//     price: 20
//   }]
// ));

// // DELETE a book
// store.dispatch(deleteBooks(
//   {id: 1}
// ));
//
// // UPDATE a book
// store.dispatch(updateBooks(
//   {
//     id: 2,
//     title: 'new title 2'
//   }
// ));
//
// //--> CART ACTIONS <--
// store.dispatch(addToCart([{id:1}]));
