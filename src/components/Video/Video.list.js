import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { fetchListVideo } from '../../networks/video';
import { LIMIT_VIDEO, SeparatePage } from '../../utils';
import { fetchVideos, deleteVideo, fetchVideoPagination  } from 'actions/video';
import { openPopup } from 'actions/popup';
import { openVideoPlayer } from 'actions/videoPlayer';
import { ROUTE_ADMIN_VIDEO_NEW, ROUTE_ADMIN_VIDEO_DETAIL } from '../routes';

import VideoItem from './VideoItem';

import './Video.list.css';

class VideoList extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      active: null,
      defaultDisable: true,
      total: null,
    }
  }

  async componentWillMount() {
    const videos = _.get(this.props, 'videoReducer');
    const { fetchVideoPaginationAction } = this.props;
    const Total = await fetchListVideo();
    this.setState({
      total: Total.data.data.total,
    })
    if (!videos || videos._id) {
      fetchVideoPaginationAction(1, LIMIT_VIDEO);
    }
  }

  toggleActive(index) {
    this.setState({
      active: index,
      defaultDisable: false,
    });
  }

  numberPage(num) {
    const arrNumber = [];
    const { active, defaultDisable } = this.state;
    const { fetchVideoPaginationAction } = this.props;
    for (let i = 0; i < num; i += 1) {
      arrNumber.push(i + 1);
    }
    return (
      _.map(arrNumber, (el, index) => (
        <li className={active === index || (defaultDisable & index === 0)  ? 'page-item disabled' : 'page-item'} key={index}>
          <div className="page-link" onClick={() => { fetchVideoPaginationAction(el, LIMIT_VIDEO); this.toggleActive(index); }} onKeyDown={() => {}} tabIndex="1" role="presentation">
            {el}
          </div>
        </li>
      ))
    );
  }

  pagination() {
    const { total } = this.state;
    const numberPagination = SeparatePage(total, LIMIT_VIDEO);
    return (
      <div className="d-flex justify-content-end mt-3">
        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            {this.numberPage(numberPagination)}
          </ul>
        </nav>
      </div>
    );
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
        {this.pagination()}
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
  fetchVideoPaginationAction: PropTypes.func.isRequired,
};

function mapReducerProps({ videoReducer }) {
  return { videoReducer };
}

const actions = {
  fetchVideosAction: fetchVideos,
  deleteVideoAction: deleteVideo,
  openPopupAction: openPopup,
  openVideoPlayerAction: openVideoPlayer,
  fetchVideoPaginationAction: fetchVideoPagination,
};

export default connect(mapReducerProps, actions)(VideoList);
