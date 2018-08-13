import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, ModalBody } from 'reactstrap';
import YouTube from 'react-youtube';

import { closeVideoPlayer } from 'actions/videoPlayer';

import './index.css';

const renderPlayer = videoId => (
  <YouTube
    videoId={videoId}
    opts={{
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    }}
  />
);

const VideoPlayer = (props) => {
  const {
    videoPlayerReducer: {
      isOpen,
      videoId,
    },
    closeVideoPlayerAction,
  } = props;
  return (
    <Modal
      isOpen={isOpen}
      toggle={closeVideoPlayerAction}
      size="sm"
    >
      <ModalBody>
        <div
          className="close-btn bg-primary"
          onClick={closeVideoPlayerAction}
          role="presentation"
        >
          <i className="fas fa-times" />
        </div>
        { renderPlayer(videoId) }
      </ModalBody>
    </Modal>
  );
};

VideoPlayer.propTypes = {
  videoPlayerReducer: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    videoId: PropTypes.func.isRequired,
  }).isRequired,
  closeVideoPlayerAction: PropTypes.func.isRequired,
};

const mapReducerToProps = ({ videoPlayerReducer }) => ({ videoPlayerReducer });

const actions = {
  closeVideoPlayerAction: closeVideoPlayer,
};

export default connect(mapReducerToProps, actions)(VideoPlayer);
