import { FETCH_USER, UPDATE_USER ,ADD_USER, DELETE_USER } from "../actions/user";
import _ from "lodash";

export default function(state = null, action){
  switch(action.type) {
    case FETCH_USER:
      return _.mapKeys(action.payload, "_id");
    case UPDATE_USER:
    case ADD_USER:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case DELETE_USER:
      return _.omit(state, [action.payload._id]);
    default:
      return state;
  }  
}
