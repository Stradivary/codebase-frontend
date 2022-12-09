import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/elements/ErrorBoundary';
import { Main } from './pages';

const App = ({ store }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Main />} exact path="/" />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default hot(App);

App.propTypes = {
  store: PropTypes.object.isRequired,
};
