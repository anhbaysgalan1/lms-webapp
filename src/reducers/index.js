import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';
import popupReducer from './popupReducer';

export default combineReducers({
  playlistReducer,
  popupReducer
});