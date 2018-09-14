import {
  fetchPlaylistsPromise,
  updatePlaylistPromise,
  deletePlaylistPromise,
  addPlaylistPromise,
  addPlaylistFromYoutubePromise,
} from '../networks/playlist';

export const FETCH_PLAYLISTS = 'Fetch playlists';
export const UPDATE_PLAYLIST = 'Update playlist';
export const ADD_PLAYLIST = 'Add playlist';
export const DELETE_PLAYLIST = 'Delete playlist';
export const ADD_PLAYLIST_FROM_YOUTUBE = 'Add playlist from youtube';

export function fetchPlaylists() {
  return {
    type: FETCH_PLAYLISTS,
    payload: fetchPlaylistsPromise(),
  };
}

export function updatePlaylist(playlist) {
  return ((dispatch) => {
    updatePlaylistPromise(playlist)
      .then(response => dispatch({
        type: UPDATE_PLAYLIST,
        payload: response.data,
      }));
  });
}

export function addPlaylist(playlist) {
  return {
    type: ADD_PLAYLIST,
    payload: addPlaylistPromise(playlist),
  };
}

export function addPlaylistFromYoutube(playlist) {
  return {
    type: ADD_PLAYLIST_FROM_YOUTUBE,
    payload: addPlaylistFromYoutubePromise(playlist),
  };
}

export function deletePlaylist(playlist) {
  return {
    type: DELETE_PLAYLIST,
    payload: deletePlaylistPromise(playlist),
  };
}
