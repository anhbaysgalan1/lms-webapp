import { DEV_API_ROOT, PROD_API_ROOT } from './configs.json';

export const ROOT_URL = process.env.NODE_ENV === 'development' ? DEV_API_ROOT : PROD_API_ROOT;
// export const ROOT_URL = 'http://localhost:9000';

export const API_URL = `${ROOT_URL}/api`;

export const API_USER = `${API_URL}/users`;
export const API_CLASSROOM = `${API_URL}/classrooms`;
export const API_CLASSROOM_COURSE = `${API_URL}/courseclassroom`;
export const API_VIDEO = `${API_URL}/videos`;
export const API_PLAYLIST = `${API_URL}/playlists`;
export const API_AUTH = `${API_URL}/auth`;

export const API_YOUTUBE = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&key=AIzaSyB4cunybCwtZCkB3xjo1F2BHIUosuwvzPw';
