import axios from 'axios';
import { API_PLAYLIST_ADMIN } from 'statics/urls';
import { fieldsNotEmpty } from 'utils';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export function fetchPlaylistsPromise() {
  return axios.get(API_PLAYLIST_ADMIN).then((response) => {
    if (fieldsNotEmpty(response, 'data.success', 'data.data')) {
      return response.data.data;
    }
    throw new Error('Unsuccessfull or no data');
  });
}

export function fetchPlaylistPromise(id) {
  return axios.get(`${API_PLAYLIST_ADMIN}/${id}`)
    .then(response => response.data)
    .then((responseData) => {
      if (!fieldsNotEmpty(responseData, 'success', 'data')) {
        throw new Error('Not success or data is empty');
      }
      return responseData.data;
    });
}

export function searchPlaylistPromise(terms) {
  return axios.get(`${API_PLAYLIST_ADMIN}?q=${terms}`)
    .then(response => response.data)
    .then((responseData) => {
      if (!fieldsNotEmpty(responseData, 'success', 'data')) {
        throw new Error('Not success or data is empty');
      }
      return responseData.data;
    });
}

export function updatePlaylistPromise(playlist) {
  return axios.put(`${API_PLAYLIST_ADMIN}/${playlist._id}`, playlist)
    .then(response => response.data);
}

export function deletePlaylistPromise(playlist) {
  return axios.delete(`${API_PLAYLIST_ADMIN}/${playlist._id}`)
    .then((response) => {
      if (response.status === 204) {
        return playlist;
      }
      throw new Error('Deletion was unsuccessful');
    });
}

export function addPlaylistPromise(playlist) {
  return axios.post(`${API_PLAYLIST_ADMIN}`, playlist)
    .then(response => response.data)
    .then((responseData) => {
      if (!fieldsNotEmpty(responseData, 'success', 'data')) {
        throw new Error('Not success or data is empty');
      }
      return responseData.data;
    });
}

export function addPlaylistFromYoutubePromise(playlistData) {
  return axios.post(`${API_PLAYLIST_ADMIN}/fromyoutube`, playlistData)
    .then(response => response.data)
    .then((responseData) => {
      if (!fieldsNotEmpty(responseData, 'success', 'data')) {
        throw new Error('Not success or data is empty');
      }
      return responseData.data;
    });
}
