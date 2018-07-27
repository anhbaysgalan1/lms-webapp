import { dummyPlaylist } from "../actions/playlist";
import axios from 'axios';
import { API_PLAYLIST } from 'statics/urls';
import { fieldsNotEmpty  } from 'utils';

export async function getPlaylists() {
  const response = await axios.get(API_PLAYLIST);
  if (fieldsNotEmpty(response, 'data.data.rows')){
    return response.data.data.rows;
  } else {
    return [];
  }
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