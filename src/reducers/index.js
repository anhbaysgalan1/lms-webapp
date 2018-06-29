import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';
import popupReducer from './popupReducer';
import classroomReducer from './classroomReducer';

export default combineReducers({
  playlistReducer,
  popupReducer,
  classroomReducer,
});