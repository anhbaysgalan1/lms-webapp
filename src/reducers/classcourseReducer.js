import _ from 'lodash';
import {
  UPDATE_COURSE_CLASSROOM, ADD_COURSE_CLASSROOM, DELETE_COURSE_CLASSROOM, FETCH_COURSE_CLASSROOM,
} from '../actions/classcourse';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_COURSE_CLASSROOM:
      return _.mapKeys(action.payload.data, '_id');

    case UPDATE_COURSE_CLASSROOM:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };

    case ADD_COURSE_CLASSROOM:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };

    case DELETE_COURSE_CLASSROOM:
      return _.omit(state, [action.payload.courseID]);


    default:
      return state;
  }
}
