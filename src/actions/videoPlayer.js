export const OPEN_VIDEOPLAYER = 'Open video player';
export const CLOSE_VIDEOPLAYER = 'Close video player';

export function openVideoPlayer(videoId) {
  return {
    type: OPEN_VIDEOPLAYER,
    payload: videoId,
  };
}

export function closeVideoPlayer() {
  return {
    type: CLOSE_VIDEOPLAYER,
    payload: null,
  };
}
