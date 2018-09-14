import {
  FETCH_PLAYLISTS,
  UPDATE_PLAYLIST,
  ADD_PLAYLIST,
  DELETE_PLAYLIST,
  FETCH_PLAYLIST_PAGE,
} from 'actions/playlist';
import _ from 'lodash';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_PLAYLIST_PAGE:
      return action.payload.data.data.playlists;
    case FETCH_PLAYLISTS:
      return _.mapKeys(action.payload, '_id');
    case UPDATE_PLAYLIST:
    case ADD_PLAYLIST:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    case DELETE_PLAYLIST:
      return _.omit(state, [action.payload._id]);
    default:
      return state;
  }
}
