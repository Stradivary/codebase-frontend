import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function(initialState) {
  const isProd = process.env.NODE_ENV === 'production';
  const middlewares = [
    thunk,
  ];

  const composeEnh = isProd ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
  const store = createStore(
    rootReducer,
    initialState,
    composeEnh(applyMiddleware(...middlewares))
  );

  if (!isProd && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
