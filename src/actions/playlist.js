import {
  fetchPlaylistsPromise,
  updatePlaylistPromise,
  deletePlaylistPromise,
  addPlaylistPromise,
} from '../networks/playlist';

export const FETCH_PLAYLISTS = 'Fetch playlists';
export const UPDATE_PLAYLIST = 'Update playlist';
export const ADD_PLAYLIST = 'Add playlist';
export const DELETE_PLAYLIST = 'Delete playlist';

export function fetchPlaylists() {
  return {
    type: FETCH_PLAYLISTS,
    payload: fetchPlaylistsPromise(),
  };
}

export function updatePlaylist(playlist) {
  return {
    type: UPDATE_PLAYLIST,
    payload: updatePlaylistPromise(playlist),
  };
}

export function addPlaylist(playlist) {
  return {
    type: ADD_PLAYLIST,
    payload: addPlaylistPromise(playlist),
  };
}

export function deletePlaylist(playlist) {
  return {
    type: DELETE_PLAYLIST,
    payload: deletePlaylistPromise(playlist),
  };
}
