import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../Reducers';

export default function makeStore() {
  return createStore(rootReducer, devToolsEnhancer({}));
}
