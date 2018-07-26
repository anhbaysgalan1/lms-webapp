import { dummyPlaylist } from "../actions/playlist";

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