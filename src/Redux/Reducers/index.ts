import postReducer from './postReducer';
import { combineReducers } from 'redux';
import portfolioReducer from './portfolioReducer';

const rootReducer = combineReducers({
  Post: postReducer,
  Portfolio: portfolioReducer
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
