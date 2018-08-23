import { DEV_ROUTE_ADMIN_ROOT, PROD_ROUTE_ADMIN_ROOT } from 'statics/configs.json';

const ROUTE_ADMIN_ROOT = process.env.NODE_ENV === 'development' ? DEV_ROUTE_ADMIN_ROOT : PROD_ROUTE_ADMIN_ROOT;

export const ROUTE_ADMIN_PLAYLIST = `${ROUTE_ADMIN_ROOT}/playlist`;
export const ROUTE_ADMIN_PLAYLIST_NEW = `${ROUTE_ADMIN_ROOT}/playlist/new`;
export const ROUTE_ADMIN_PLAYLIST_DETAIL = `${ROUTE_ADMIN_ROOT}/playlist/detail`;
export const ROUTE_ADMIN_PLAYLIST_DETAIL_ID = `${ROUTE_ADMIN_ROOT}/playlist/detail/:_id`;

export const ROUTE_ADMIN_CLASSROOM = `${ROUTE_ADMIN_ROOT}/classroom`;
export const ROUTE_ADMIN_CLASSROOM_NEW = `${ROUTE_ADMIN_ROOT}/classroom/new`;
export const ROUTE_ADMIN_CLASSROOM_DETAIL = `${ROUTE_ADMIN_ROOT}/classroom/detail`;
export const ROUTE_ADMIN_CLASSROOM_DETAIL_ID = `${ROUTE_ADMIN_ROOT}/classroom/detail/:id`;

export const ROUTE_ADMIN_CLASSROOM_COURSE = `${ROUTE_ADMIN_ROOT}/course`;
export const ROUTE_ADMIN_CLASSROOM_NEW_COURSE = `${ROUTE_ADMIN_ROOT}/course/new`;
export const ROUTE_ADMIN_CLASSROOM_DETAIL_COURSE = `${ROUTE_ADMIN_ROOT}/course/detail`;
export const ROUTE_ADMIN_CLASSROOM_DETAIL_COURSE_ID = `${ROUTE_ADMIN_ROOT}/course/detail/:id`;

export const ROUTE_ADMIN_USER = `${ROUTE_ADMIN_ROOT}/user`;
export const ROUTE_ADMIN_USER_NEW = `${ROUTE_ADMIN_ROOT}/user/new`;
export const ROUTE_ADMIN_USER_DETAIL = `${ROUTE_ADMIN_ROOT}/user/detail`;
export const ROUTE_ADMIN_USER_DETAIL_ID = `${ROUTE_ADMIN_ROOT}/user/detail/:id`;

export const ROUTE_ADMIN_VIDEO = `${ROUTE_ADMIN_ROOT}/video`;
export const ROUTE_ADMIN_VIDEO_NEW = `${ROUTE_ADMIN_ROOT}/video/new`;
export const ROUTE_ADMIN_VIDEO_DETAIL = `${ROUTE_ADMIN_ROOT}/video/detail`;
export const ROUTE_ADMIN_VIDEO_DETAIL_ID = `${ROUTE_ADMIN_ROOT}/video/detail/:id`;
