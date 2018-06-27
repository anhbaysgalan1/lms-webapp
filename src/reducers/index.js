import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';
import usersReducer from './usersReducer';
import popupReducer from './popupReducer';

export default combineReducers({
  playlistReducer,
  usersReducer,
  popupReducer
});