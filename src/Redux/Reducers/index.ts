import { combineReducers } from 'redux';
import postReducer from './postReducer';
import portfolioReducer from './portfolioReducer';

const rootReducer = combineReducers({
  Post: postReducer,
  Portfolio: portfolioReducer
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
