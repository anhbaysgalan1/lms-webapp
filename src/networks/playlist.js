import { dummyPlaylist } from "../actions/playlist";
import axios from 'axios';
import { API_PLAYLIST } from 'statics/urls';
import { fieldsNotEmpty  } from 'utils';

export function getPlaylists() {
  return axios.get(API_PLAYLIST).then(response => {
    if (fieldsNotEmpty(response, 'data.success', 'data.data.rows')) {
      return response.data.data.rows;
    } else {
      throw "Unsuccessfull or no data";
    }
  });
}

export function fetchPlaylist(id) {
  return new Promise((resolve, reject) => {
    const playlist = dummyPlaylist.filter((playlist) => {
      return playlist._id === id;
    })[0];
    resolve(playlist);
  }); 
}

export function searchPlaylist(terms){
  return dummyPlaylist;
}