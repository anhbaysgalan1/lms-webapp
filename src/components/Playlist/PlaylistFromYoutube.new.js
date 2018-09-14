import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, FormGroup, Label, Input, Button, Col,
} from 'reactstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { handleGoBack, getYoutubeId } from 'utils';
import { addPlaylistFromYoutube } from 'actions/playlist';
import { getYoutubePlaylistInfo } from 'networks/youtube';
import { openVideoPlayer } from 'actions/videoPlayer';

import VideoItem from 'components/Video/VideoItem';

class PlaylistFromYoutubeNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      youtubePlaylistId: '',
      playlistData: {
        title: '',
        videos: []
      },
      touched: {},
      isLoading: false,
    }

    this.submitPlaylist = this.submitPlaylist.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submitPlaylist() {
    const { playlistData } = this.state;
    const { addPlaylistFromYoutubeAction, history } = this.props;
    this.setState({ isLoading: true })
    addPlaylistFromYoutubeAction(playlistData)
      .then(() => {
        console.log("done")
        handleGoBack(history);
      });
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    if(name === 'playlistYoutubeLink') {
      const youtubePlaylistId = getYoutubeId(value, 'playlist');
      if(youtubePlaylistId) {
        this.setState({ isLoading: true, youtubePlaylistId });
        getYoutubePlaylistInfo(youtubePlaylistId)
          .then(playlistData => {
            console.log(playlistData)
            if(playlistData && playlistData.length > 0) {
              this.setState({ isLoading: false, playlistData: { title: '', videos: playlistData } });
            }
          })
      }
    } else if(name === 'playlistTitle') {
      this.setState({ playlistData: { ...this.state.playlistData, title: value } });
    }
  }

  renderVideosInfo() {
    const { openVideoPlayerAction } = this.props;
    const { videos } = this.state.playlistData;

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
          videos.map((video, index) => (
            <div
              className="video-item"
              key={video.videoId}
              role="button"
              tabIndex={index}
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
                className="controls"
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  this.removeVideo(video.videoId);
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

  render() {
    const { history } = this.props;
    const { isLoading, playlistData, youtubePlaylistId, touched } = this.state;
    
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }

    return (
      <Col lg="12">
          <FormGroup className="classroom-select">
            <Label for="playlistYoutubeLink">
              Youtube playlist link:
            </Label>
            <Input type="text" value={youtubePlaylistId} name="playlistYoutubeLink" id="playlistYoutubeLink" onChange={this.handleInputChange} required/>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => { handleGoBack(history); }}
              className="mx-1"
              color="secondary"
            >
              {' '}
              Cancel
            </Button>
            { playlistData.videos.length > 0 ? (
              <Button
                onClick={this.submitPlaylist}
                color="primary"
                disabled={playlistData.title === ''}
              >
                {' '}
                OK
                {' '}
              </Button>
            ) : '' }
          </div>
          { playlistData.videos.length > 0 ? (
            <div>
              <Form>
                <FormGroup className="classroom-select">
                  <Label for="playlistTitle">
                    Playlist title:
                  </Label>
                  <Input
                    type="text"
                    value={playlistData.title}
                    name="playlistTitle"
                    id="playlistTitle"
                    invalid={touched.playlistTitle && playlistData.title === ''}
                    onBlur={() => {
                      this.setState({ touched: { ...touched, playlistTitle: true } })
                    }}
                    onChange={this.handleInputChange} required
                  />
                  <div className="text-danger">
                    {touched.playlistTitle && playlistData.title === '' ? 'Playlist title is required!' : ''}
                  </div>
                </FormGroup>
              </Form>
              {this.renderVideosInfo()}
            </div>
          ) : '' }
      </Col>
    );
  }
}

PlaylistFromYoutubeNew.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  addPlaylistFromYoutubeAction: PropTypes.func.isRequired,
  openVideoPlayerAction: PropTypes.func.isRequired,
};

const actions = {
  addPlaylistFromYoutubeAction: addPlaylistFromYoutube,
  openVideoPlayerAction: openVideoPlayer,
};

export default connect(null, actions)(PlaylistFromYoutubeNew);
