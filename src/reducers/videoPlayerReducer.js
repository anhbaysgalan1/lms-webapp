import { OPEN_VIDEOPLAYER, CLOSE_VIDEOPLAYER } from 'actions/videoPlayer';

export default function (state = { isOpen: false, videoId: '' }, action) {
  switch (action.type) {
    case OPEN_VIDEOPLAYER:
      return {
        isOpen: true,
        videoId: action.payload,
      };
    case CLOSE_VIDEOPLAYER:
      return {
        isOpen: false,
        videoId: null,
      };
    default:
      return state;
  }
}
