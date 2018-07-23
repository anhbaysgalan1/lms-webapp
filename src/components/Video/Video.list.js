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
    if(!this.props.videoReducer) {
      this.props.fetchVideos();
    }
  }

  renderVideos() {

    const videos = this.props.videoReducer;
    if(!videos) return <div>Loading...</div>
    
    return (
      <div className="round-panel">
        <div className="video-item header">
          <div className="no">#</div>
          <div className="title">Title</div>
          <div className="description">Description</div>
          <div className="url">Video Url</div>
          <div className="controls">
            <div className="delete">
              <i className="text-dark fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
        {
          _.values(videos).map((video, index) => {
            return (
              <div 
                className="video-item"
                key={video._id}
                onClick={() => this.props.history.push(`${ROUTE_ADMIN_VIDEO_DETAIL}/${video._id}`)}
              >
                <div className="no">{ index + 1 }</div>
                <div className="title">{ video.title }</div>
                <div className="description">{ video.description.slice(0, 50) }</div>
                <div className="url"><Link to={`https://www.youtube.com/${ video.videoId }`} target="_blank">https://youtu.be/{ video.videoId }</Link></div>
                <div className="controls" 
                  onClick={(event) => {
                  event.stopPropagation();
                  this.props.openPopup(() => {
                    this.props.deleteVideo(video)
                  },
                  null);
                }}>
                  <div className="delete">
                    <i className="text-dark fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderControls() {
    return (
      <div className="admin-controls">
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => this.props.history.push(ROUTE_ADMIN_VIDEO_NEW)}
        >
          <i className="fas fa-plus mr-1"></i> {'  '} Add video
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
  openPopup
}
  
export default connect(mapReducerProps, actions)(VideoList);