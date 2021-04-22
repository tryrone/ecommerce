import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default () => {
  return {
    store,
  };
};

export const getState = () => store.getState();

export const dispatch = (action) => {
  return store.dispatch(action);
};
