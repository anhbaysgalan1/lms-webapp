import _ from 'lodash';
import {
  FETCH_USER,
  UPDATE_USER,
  ADD_USER,
  DELETE_USER,
} from '../actions/user';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return _.mapKeys(action.payload.data.data, '_id');
    case ADD_USER:
      return {
        [action.payload.data.data._id]: action.payload.data.data,
        ...state,
      };
    case UPDATE_USER:
      return {
        ...state,
        [action.payload.data.data._id]: action.payload.data.data,
      };
    case DELETE_USER:
      return _.omit(state, [action.payload.userId]);

    default:
      return state;
  }
}
