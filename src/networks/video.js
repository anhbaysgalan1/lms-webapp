import _ from 'lodash';
import { dummyPlaylist } from 'actions/playlist';
import { plainText } from 'utils';

const videos = _.flatten(dummyPlaylist.map((playlist) => {
  return playlist.videos;
}));

export function searchVideo(terms) {
  return _.slice(videos.filter((video) => {
    return plainText(video.name).includes(plainText(terms));
  }), 0, 5);  
}