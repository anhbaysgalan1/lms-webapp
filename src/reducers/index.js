import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';
import popupReducer from './popupReducer';
import classroomReducer from './classroomReducer';
import classcourseReducer from './classcourseReducer';

export default combineReducers({
  playlistReducer,
  popupReducer,
  classroomReducer,
  classcourseReducer,
});