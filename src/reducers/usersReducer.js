import {FETCH_USERS, UPDATE_USER_ROLE ,ADD_USERS, DELETE_USERS} from "../actions/users";
import _ from "lodash";

export default function(state = null, action){
  switch(action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload, "_id");
    case UPDATE_USER_ROLE:
      return {
        ...state,
        [action.payload._id] : action.payload
      };
    case ADD_USERS:
      return {
        ...state,
        [action.payload._id] : action.payload
      };
    case DELETE_USERS:
      return _.omit(state, [action.payload._id]);
    default:
      return state;

    }  
}
