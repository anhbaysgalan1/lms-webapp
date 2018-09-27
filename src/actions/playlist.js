import axios from 'axios';
import {
  fetchPlaylistsPromise,
  updatePlaylistPromise,
  deletePlaylistPromise,
  addPlaylistPromise,
  addPlaylistFromYoutubePromise,
} from '../networks/playlist';
import { API_PLAYLIST_ADMIN } from '../statics/urls';

export const FETCH_PLAYLISTS = 'Fetch playlists';
export const UPDATE_PLAYLIST = 'Update playlist';
export const ADD_PLAYLIST = 'Add playlist';
export const DELETE_PLAYLIST = 'Delete playlist';
export const ADD_PLAYLIST_FROM_YOUTUBE = 'Add playlist from youtube';
export const FETCH_PLAYLIST_PAGE = 'FETCH_PLAYLIST_PAGE';

export function fetchPlaylistPagination(number, limit, keyword) {
  const request = axios.get(`${API_PLAYLIST_ADMIN}?page=${number || 1}&limit=${limit || 30}${keyword ? `&q=${keyword}` : ''}`);
  return {
    type: FETCH_PLAYLIST_PAGE,
    payload: request,
  };
}

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
