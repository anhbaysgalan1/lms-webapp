import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import popupReducer from './popupReducer';

export default combineReducers({
  videoReducer,
  popupReducer
});