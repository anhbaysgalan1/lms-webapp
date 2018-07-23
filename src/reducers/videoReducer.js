import { FETCH_VIDEOS, FETCH_VIDEO_DETAIL, UPDATE_VIDEO, ADD_VIDEO, DELETE_VIDEO } from "../actions/video";
import _ from 'lodash';

export default function(state = null, action){
  switch(action.type) {
    case FETCH_VIDEOS:
      return _.has(action.payload, "data.data") ? _.mapKeys(action.payload.data.data, "_id") : [];
    case UPDATE_VIDEO:
    case ADD_VIDEO:
      return state ? {
        ...state,
        [action.payload.data.data._id]: action.payload.data.data
      } : null;
    case DELETE_VIDEO:
      return state ? _.omit(state, [action.payload.video._id]) : null;
    case FETCH_VIDEO_DETAIL:
      return {
        [action.payload.data.data._id]: action.payload.data.data,
        ...state
      };
    default:
      return state;
  }
}