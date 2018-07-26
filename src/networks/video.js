import _ from 'lodash';
import axios from 'axios';
import { API_VIDEO } from 'statics/urls';
import { dummyPlaylist } from 'actions/playlist';
import { plainText, fieldsNotEmpty } from 'utils';

const videos = _.flatten(dummyPlaylist.map((playlist) => {
  return playlist.videos;
}));

export function searchVideo(terms) {
  const searchUrl = `${API_VIDEO}?q=${terms}`;
  return new Promise((resolve, reject) => {
    axios.get(searchUrl).then(response => {
      const responseData = response.data;
      if(fieldsNotEmpty(responseData, 'success', 'data')) {
        resolve(responseData.data);
      } else {
        reject("Not success or data is empty");
      }
    })
    .catch(reject);
  });
}