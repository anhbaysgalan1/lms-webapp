import _ from 'lodash';
import {
  FETCH_USER,
  UPDATE_USER,
  ADD_USER,
  DELETE_USER,
  FETCH_USER_PAGE,
} from '../actions/user';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return _.mapKeys(action.payload.data.data.users, '_id');
    case ADD_USER:
      return {
        [action.payload.data.data.users._id]: action.payload.data.data.users,
        ...state,
      };
    case UPDATE_USER:
      return {
        ...state,
        [action.payload.data.data.users._id]: action.payload.data.data.users,
      };
    case DELETE_USER:
      return _.omit(state, [action.payload.userId]);

    case FETCH_USER_PAGE:
      console.log(action.payload.data.data);
      return action.payload.data.data.users;

    default:
      return state;
  }
}
