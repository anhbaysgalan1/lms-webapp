import axios from 'axios';
import { API_PLAYLIST } from 'statics/urls';
import { fieldsNotEmpty  } from 'utils';

export function fetchPlaylistsPromise() {
  return axios.get(API_PLAYLIST).then(response => {
    if (fieldsNotEmpty(response, 'data.success', 'data.data')) {
      return response.data.data;
    } else {
      throw "Unsuccessfull or no data";
    }
  });
}

export function fetchPlaylistPromise (id) {
  return axios.get(`${API_PLAYLIST}/${id}`)
    .then(response => response.data)
    .then(responseData => {
      if (!fieldsNotEmpty(responseData, 'success', 'data')) {
        throw "Not success or data is empty";
      }

      return responseData.data;
    });
}

export function searchPlaylistPromise (terms) {
  return axios.get(`${API_PLAYLIST}?q=${terms}`)
    .then(response => response.data)
    .then(responseData => {
      if (!fieldsNotEmpty(responseData, 'success', 'data')) {
        throw "Not success or data is empty";
      }

      return responseData.data;
    });
}

export function updatePlaylistPromise (playlist) {
  return axios.put(`${API_PLAYLIST}/${playlist._id}`, playlist)
}

export function deletePlaylistPromise (playlist) {
  return axios.delete(`${API_PLAYLIST}/${playlist._id}`)
              .then(response => {
                if (response.status == 204) {
                  return playlist;
                } else {
                  throw "Deletion was unsuccessful";
                }
              });
}

export function addPlaylistPromise (playlist) {
  return axios.post(`${API_PLAYLIST}`, playlist)
    .then(response => response.data)
    .then(responseData => {
      if (!fieldsNotEmpty(responseData, 'success', 'data')) {
        throw "Not success or data is empty";
      }

      return responseData.data;
    });
}