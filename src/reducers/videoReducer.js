import { FETCH_VIDEOS, FETCH_VIDEO_DETAIL, UPDATE_VIDEO, ADD_VIDEO, DELETE_VIDEO } from "../actions/video";
import _ from 'lodash';

export default function(state = null, action){
  switch(action.type) {
    case FETCH_VIDEOS:
      return _.has(action.payload, "data.data") ? _.mapKeys(action.payload.data.data, "_id") : [];
    case UPDATE_VIDEO:
    case ADD_VIDEO:
      return action.payload.data.data._id ? action.payload.data.data : {};
    case DELETE_VIDEO:
      return state && action.payload._id ? _.omit(state, [action.payload._id]) : {};
    case FETCH_VIDEO_DETAIL:
      return action.payload.data.data._id ? action.payload.data.data : {};
    default:
      return state;
  }
}