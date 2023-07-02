import { combineReducers } from 'redux';
import ArticleReducer from '../article/reducer';

const reducerCombination = combineReducers({
  ArticleReducer,
});

export default reducerCombination;

