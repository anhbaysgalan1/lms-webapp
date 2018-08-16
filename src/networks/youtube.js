import axios from 'axios';
import { API_YOUTUBE } from 'statics/urls';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export default async function getYoutubeVideoInfo(videoId) {
  const videoInfo = await axios.get(`${API_YOUTUBE}&id=${videoId}`);
  return videoInfo.data;
}
