import { FETCH_PLAYLISTS } from "../actions/playlist";
import _ from 'lodash';

export default function(state = null, action){
  switch(action.type) {
    case FETCH_PLAYLISTS:
      return _.mapKeys(action.payload, "_id");
    default:
      return state;
  }
}