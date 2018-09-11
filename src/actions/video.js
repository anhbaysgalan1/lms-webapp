import axios from 'axios';
import { API_VIDEO } from 'statics/urls';

export const FETCH_VIDEOS = 'Fetch videos';
export const FETCH_VIDEO_DETAIL = 'Fetch video detail';
export const UPDATE_VIDEO = 'Update video';
export const ADD_VIDEO = 'Add video';
export const DELETE_VIDEO = 'Delete video';
export const FETCH_VIDEOS_PAGE = 'FETCH_VIDEOS_PAGE';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export function fetchVideoPagination(number, limit) {
  const request = axios.get(`${API_VIDEO}?page=${number}&limit=${limit}`);
  return {
    type: FETCH_VIDEOS_PAGE,
    payload: request,
  };
}

export function fetchVideos() {
  const request = axios.get(API_VIDEO);
  return {
    type: FETCH_VIDEOS,
    payload: request,
  };
}

export function fetchVideoDetail(videoId) {
  const request = axios.get(`${API_VIDEO}/${videoId}`);
  return {
    type: FETCH_VIDEO_DETAIL,
    payload: request,
  };
}

export function updateVideo(video) {
  const request = axios.put(`${API_VIDEO}/${video._id}`, video);
  return {
    type: UPDATE_VIDEO,
    payload: request,
  };
}

export function addVideo(video) {
  const request = axios.post(API_VIDEO, video);
  return {
    type: ADD_VIDEO,
    payload: request,
  };
}

export async function deleteVideo(video) {
  await axios.delete(`${API_VIDEO}/${video._id}`);
  return {
    type: DELETE_VIDEO,
    payload: video,
  };
}
