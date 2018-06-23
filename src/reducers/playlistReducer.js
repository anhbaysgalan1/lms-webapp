import { FETCH_PLAYLISTS, UPDATE_PLAYLIST, ADD_PLAYLIST } from "../actions/playlist";
import _ from 'lodash';

export default function(state = null, action){
  switch(action.type) {
    case FETCH_PLAYLISTS:
      return _.mapKeys(action.payload, "_id");
    case UPDATE_PLAYLIST:
    case ADD_PLAYLIST:
      const playlist = action.payload;
      return {
        ...state,
        [playlist._id]: playlist
      };
    default:
      return state;
  }
}