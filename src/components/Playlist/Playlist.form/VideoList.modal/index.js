import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap';
import _ from 'lodash';

import PropTypes from 'prop-types';
import SearchBar from 'components/SearchBar';
import searchVideo from 'networks/video';

import VideoItem from 'components/Video/VideoItem';

class VideoListModal extends Component {
  constructor(props) {
    super(props);
    this.searchVideo = this.searchVideo.bind(this);
    this.state = {
      videos: {},
      selectedVideos: {},
    };
  }

  componentWillMount() {
    this.searchVideo('');
  }

  searchVideo(terms) {
    searchVideo(terms).then(resultList => this.setState({
      videos: _.mapKeys(resultList, '_id'),
    })).catch(err => console.log(err));
  }

  renderBody() {
    const { toggle, onOK } = this.props;
    const { selectedVideos } = this.state;
    return (
      <div>
        <SearchBar
          className="mb-2"
          onSearch={this.searchVideo}
        />
        {this.renderVideos()}
        <div className="d-flex justify-content-end">
          <Button
            onClick={toggle}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onOK(_.values(selectedVideos));
              toggle();
            }}
            color="primary"
            className="mx-1"
          >
            OK
          </Button>
        </div>
      </div>
    );
  }

  renderVideoItem(video, index) {
    const { videos, selectedVideos } = this.state;
    return (
      <VideoItem
        index={index}
        key={video._id}
        {...video}
        disableDelete
        onClick={() => {
          const newVideo = { ...video, selected: !video.selected };
          this.setState({
            videos: {
              ...videos,
              [video._id]: newVideo,
            },
            selectedVideos: {
              ...selectedVideos,
              [video._id]: video,
            },
          });
        }}
      />
    );
  }

  renderVideos() {
    const { videos } = this.state;
    const videoList = _.values(videos);
    if (videoList.length === 0) {
      return (
        <div className="pt-2">
          No results
        </div>
      );
    }

    return (
      <div className="pt-2">
        {
          videoList.map((video, index) => this.renderVideoItem(video, index))
        }
      </div>);
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="lg"
      >
        <ModalHeader>
          Video list
        </ModalHeader>
        <ModalBody>
          { this.renderBody() }
        </ModalBody>
      </Modal>
    );
  }
}

VideoListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onOK: PropTypes.func.isRequired,
};

export default VideoListModal;
