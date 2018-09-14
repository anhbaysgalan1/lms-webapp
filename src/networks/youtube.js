import axios from 'axios';
import _ from 'lodash';
import { API_YOUTUBE_VIDEO, API_YOUTUBE_PLAYLIST, API_YOUTUBE_VIDEO_CONTENT_ONLY } from 'statics/urls';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export async function getYoutubeVideoInfo(videoId) {
  const videoInfo = await axios.get(`${API_YOUTUBE_VIDEO}&id=${videoId}`);
  return videoInfo.data;
}

export function getYoutubePlaylistInfo(playlistId, playlistData, nextPageToken) {
  return new Promise(async (resolve, reject) => {
    let playlist = [];
    let videoIdList = [];
    const playlistInfo = await axios.get(`${API_YOUTUBE_PLAYLIST}&playlistId=${playlistId}${nextPageToken ? '&pageToken='+nextPageToken : ''}`);
    if(playlistInfo.data && playlistInfo.data.nextPageToken) {
      let playlistItems = playlistInfo.data.items.map(item => {
        videoIdList.push(_.get(item, 'snippet.resourceId.videoId'))
        return {
          title: _.get(item, 'snippet.title') || '',
          description: _.get(item, 'snippet.description') || '',
          videoId: _.get(item, 'snippet.resourceId.videoId'),
          duration: '',
        }
      });
      let videoContents = await axios.get(`${API_YOUTUBE_VIDEO_CONTENT_ONLY}&id=${videoIdList.join(',')}`);
      playlist = playlistItems.map((item, index) => {
        return {
          ...item,
          duration: _.get(videoContents.data, `items[${index}].contentDetails.duration`)
            ? _.get(videoContents.data, `items[${index}].contentDetails.duration`).slice(2)
            : '',
        }
      });
      resolve(await getYoutubePlaylistInfo(playlistId, [ ...playlist, ...(playlistData ? playlistData : []) ], playlistInfo.data.nextPageToken));
    } else if(playlistInfo.data && !playlistInfo.data.nextPageToken) {
      let playlistItems = playlistInfo.data.items.map(item => {
        videoIdList.push(_.get(item, 'snippet.resourceId.videoId'))
        return {
          title: _.get(item, 'snippet.title') || '',
          description: _.get(item, 'snippet.description') || '',
          videoId: _.get(item, 'snippet.resourceId.videoId'),
          duration: '',
        }
      });
      let videoContents = await axios.get(`${API_YOUTUBE_VIDEO_CONTENT_ONLY}&id=${videoIdList.join(',')}`);
      playlist = playlistItems.map((item, index) => {
        return {
          ...item,
          duration: _.get(videoContents.data, `items[${index}].contentDetails.duration`)
            ? _.get(videoContents.data, `items[${index}].contentDetails.duration`).slice(2)
            : '',
        }
      });
      resolve([ ...playlist, ...(playlistData ? playlistData : []) ]);
    }
  });
}