import axios from 'axios';
import { API_VIDEOS } from './urls';

export const FETCH_VIDEOS = "Fetch videos";
export const FETCH_VIDEO_DETAIL = "Fetch video detail";
export const UPDATE_VIDEO = "Update video";
export const ADD_VIDEO = "Add video";
export const DELETE_VIDEO = "Delete video";

export function fetchVideos() {
  const request = axios.get(API_VIDEOS);
  return {
    type: FETCH_VIDEOS,
    payload: request
  }
}

export function fetchVideoDetail(videoId) {
  const request = axios.get(`${API_VIDEOS}/${videoId}`);
  return {
    type: FETCH_VIDEO_DETAIL,
    payload: request
  }
}

export function updateVideo(video) {
  const request = axios.put(`${API_VIDEOS}/${video._id}`, video);
  return {
    type: UPDATE_VIDEO,
    payload: request
  };
}

export function addVideo(video) {
  const request = axios.post(API_VIDEOS, video);
  return {
    type: ADD_VIDEO,
    payload: request
  };
}

export async function deleteVideo(video) {
  await axios.delete(`${API_VIDEOS}/${video._id}`);
  return {
    type: DELETE_VIDEO,
    payload: video
  };
}