import _ from 'lodash';
import {
  FETCH_CLASSROOM,
  DELETE_CLASSROOM,
  ADD_CLASSROOM,
  UPDATE_CLASSROOM,
  FETCH_CLASSROOM_PAGE,
} from '../actions/classroom';


export default function (state = null, action) {
  switch (action.type) {
    case FETCH_CLASSROOM_PAGE:
      return action.payload.data.data.class;

    case FETCH_CLASSROOM:
      return _.mapKeys(action.payload.class, '_id');

    case UPDATE_CLASSROOM:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };

    case ADD_CLASSROOM:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };

    case DELETE_CLASSROOM:
      return _.omit(state, [action.payload.classID]);


    default:
      return state;
  }
}
