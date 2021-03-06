import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import usersReducer from './usersReducer';
import popupReducer from './popupReducer';
import playlistReducer from './playlistReducer';
import classroomReducer from './classroomReducer';
import classcourseReducer from './classcourseReducer';
import authReducer from './authReducer';
import videoPlayerReducer from './videoPlayerReducer';

export default combineReducers({
  classroomReducer,
  classcourseReducer,
  usersReducer,
  videoReducer,
  popupReducer,
  playlistReducer,
  authReducer,
  videoPlayerReducer,
});
