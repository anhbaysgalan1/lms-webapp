import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchVideos, deleteVideo } from 'actions/video';
import { openPopup } from 'actions/popup';
import { ROUTE_ADMIN_VIDEO_NEW, ROUTE_ADMIN_VIDEO_DETAIL } from '../routes';

import './Video.list.css';

class VideoList extends Component {
  componentWillMount() {
    const videos = _.get(this.props, 'videoReducer');
    const fetchVideosAction = _.get(this.props, 'fetchVideos');

    if (!videos || videos._id) {
      fetchVideosAction();
    }
  }

  renderVideos() {
    const videos = _.get(this.props, 'videoReducer');
    const openPopupAction = _.get(this.props, 'openPopup');
    const deleteVideoAction = _.get(this.props, 'deleteVideo');
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
          <div className="url">
            Video Url
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
              role="button"
              tabIndex={index}
              className="video-item"
              key={video._id}
              onClick={() => history.push(`${ROUTE_ADMIN_VIDEO_DETAIL}/${video._id}`)}
              onKeyPress={() => {}}
            >
              <div className="no">
                { index + 1 }
              </div>
              <div className="title">
                { video.title }
              </div>
              <div className="description">
                { video.description ? video.description.slice(0, 50) : '' }
              </div>
              <div className="url">
                <Link to={`https://youtu.be/${video.videoId}`} target="_blank">
                  https://youtu.be/
                  { video.videoId }
                </Link>
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

function mapReducerProps({ videoReducer }) {
  return { videoReducer };
}

const actions = {
  fetchVideos,
  deleteVideo,
  openPopup,
};

export default connect(mapReducerProps, actions)(VideoList);
