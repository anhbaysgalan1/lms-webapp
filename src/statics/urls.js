import { DEV_API_ROOT, PROD_API_ROOT } from './configs.json';

export const ROOT_URL = process.env.NODE_ENV === 'development' ? DEV_API_ROOT : PROD_API_ROOT;
// export const ROOT_URL = 'http://localhost:9000';

export const API_URL = `${ROOT_URL}/api`;

export const API_USER = `${API_URL}/users`;
export const API_CLASSROOM = `${API_URL}/classrooms`;
export const API_CLASSROOM_COURSE = `${API_URL}/courseclassroom`;
export const API_VIDEO = `${API_URL}/videos`;
export const API_PLAYLIST = `${API_URL}/playlistadmin`;
export const API_AUTH = `${API_URL}/auth`;

const apiKey = 'AIzaSyB4cunybCwtZCkB3xjo1F2BHIUosuwvzPw';
//AIzaSyC97N3UC8A98GOXyTggPh7--jSwY6STnvA

export const API_YOUTUBE_ROOT = 'https://www.googleapis.com/youtube/v3';
export const API_YOUTUBE_VIDEO = `${API_YOUTUBE_ROOT}/videos?part=snippet%2CcontentDetails&key=${apiKey}`;
export const API_YOUTUBE_VIDEO_CONTENT_ONLY = `${API_YOUTUBE_ROOT}/videos?part=contentDetails&key=${apiKey}`;
export const API_YOUTUBE_PLAYLIST = `${API_YOUTUBE_ROOT}/playlistItems?maxResults=50&part=snippet&key=${apiKey}`;
