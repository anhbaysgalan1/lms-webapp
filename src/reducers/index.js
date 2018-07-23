import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import popupReducer from './popupReducer';
import classroomReducer from './classroomReducer';
import classcourseReducer from './classcourseReducer';

export default combineReducers({
  classroomReducer,
  classcourseReducer,
  videoReducer,
  popupReducer
});