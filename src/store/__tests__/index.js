import { createStore } from 'redux';
import configureStore from '../configureStore';

jest.mock('redux', () => ({
  applyMiddleware: jest.fn(() => 'middlewares'),
  compose: jest.fn(v => v),
  createStore: jest.fn(),
}));

jest.mock('../../reducers', () => 'reducer');

describe('src/store', () => {
  test('production', () => {
    process.env.NODE_ENV = 'production';
    configureStore('initial');
    expect(createStore).toHaveBeenCalledWith('reducer', 'initial', 'middlewares');
  });

  test('development', () => {
    process.env.NODE_ENV = 'development';
    configureStore('initial');
    expect(createStore).toHaveBeenCalledWith('reducer', 'initial', 'middlewares');
  });
});
