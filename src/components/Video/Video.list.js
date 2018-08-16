import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { fetchVideos, deleteVideo } from 'actions/video';
import { openPopup } from 'actions/popup';
import { openVideoPlayer } from 'actions/videoPlayer';
import { ROUTE_ADMIN_VIDEO_NEW, ROUTE_ADMIN_VIDEO_DETAIL } from '../routes';

import VideoItem from './VideoItem';

import './Video.list.css';

class VideoList extends Component {
  componentWillMount() {
    const videos = _.get(this.props, 'videoReducer');
    const { fetchVideosAction } = this.props;

    if (!videos || videos._id) {
      fetchVideosAction();
    }
  }

  renderVideos() {
    const videos = _.get(this.props, 'videoReducer');
    const { deleteVideoAction, openPopupAction, openVideoPlayerAction } = this.props;
    const history = _.get(this.props, 'history');

    if (!videos || videos._id) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className="round-panel">
        <div className="video-item header">
          <div className="no">
            #
          </div>
          <div className="title">
            Title
          </div>
          <div className="description">
            Description
          </div>
          <div className="duration">
            Duration
          </div>
          <div className="preview">
            Video preview
          </div>
          <div className="controls">
            <div className="delete">
              <i className="text-dark fas fa-trash-alt" />
            </div>
          </div>
        </div>
        {
          _.values(videos).map((video, index) => (
            <div
              className="video-item"
              key={video._id}
              role="button"
              tabIndex={index}
              onClick={() => history.push(`${ROUTE_ADMIN_VIDEO_DETAIL}/${video._id}`)}
              onKeyPress={() => {}}
            >
              <div
                className="no"
              >
                { index + 1 }
              </div>
              <div
                className="title"
              >
                { video.title }
              </div>
              <div
                className="description"
              >
                { video.description ? video.description.slice(0, 50) : '' }
              </div>
              <div className="duration">
                { video.duration ? video.duration : '' }
              </div>
              <div
                className="preview"
              >
                <VideoItem
                  role="button"
                  tabIndex={index}
                  onKeyPress={() => {}}
                  index={index}
                  {...video}
                  key={video._id}
                  onClick={(event) => {
                    event.stopPropagation();
                    openVideoPlayerAction(video.videoId);
                  }}
                  showPreviewOnly
                />
              </div>
              <div
                role="button"
                tabIndex={index}
                className="controls"
                onKeyPress={() => {}}
                onClick={(event) => {
                  event.stopPropagation();
                  openPopupAction(() => {
                    deleteVideoAction(video);
                  },
                  null);
                }}
              >
                <div className="delete">
                  <i className="text-dark fas fa-trash-alt" />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  renderControls() {
    const history = _.get(this.props, 'history');
    return (
      <div className="admin-controls">
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => history.push(ROUTE_ADMIN_VIDEO_NEW)}
        >
          <i className="fas fa-plus mr-1" />
          {'  '}
          Add video
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderControls()}
        {this.renderVideos()}
      </div>
    );
  }
}

VideoList.propTypes = {
  openPopupAction: PropTypes.func.isRequired,
  deleteVideoAction: PropTypes.func.isRequired,
  fetchVideosAction: PropTypes.func.isRequired,
  openVideoPlayerAction: PropTypes.func.isRequired,
};

function mapReducerProps({ videoReducer }) {
  return { videoReducer };
}

const actions = {
  fetchVideosAction: fetchVideos,
  deleteVideoAction: deleteVideo,
  openPopupAction: openPopup,
  openVideoPlayerAction: openVideoPlayer,
};

export default connect(mapReducerProps, actions)(VideoList);
