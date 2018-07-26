import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import _ from 'lodash';

import SearchBar from 'components/SearchBar';
import VideoItem from '../VideoItem'

import { searchVideo } from 'networks/video';

class VideoListModal extends Component {
  constructor(props) {
    super(props);
    this.searchVideo = this.searchVideo.bind(this);
    this.state = {
      videos: {},
      selectedVideos: {}
    };
  }

  componentWillMount() {
    this.searchVideo("");
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        size="lg"
      >
        
        <ModalHeader>Video list</ModalHeader>
        <ModalBody>
          { this.renderBody() }
        </ModalBody>
      </Modal>
    );
  }

  searchVideo(terms) {
    this.setState({
      videos: _.mapKeys(searchVideo(terms), "_id")
    })
  }

  renderBody() {
    return (
      <div>
        <SearchBar
          className="mb-2"
          onSearch={this.searchVideo}
        />
        {this.renderVideos()}
        <div className="d-flex justify-content-end">
          <Button
            onClick={this.props.toggle}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.props.onOK(_.values(this.state.selectedVideos));
              this.props.toggle();
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

  renderVideos() {
    const videos = _.values(this.state.videos);
    if(videos.length === 0) return <div className="pt-2">No results</div>

    return (<div className="pt-2">
    {
      videos.map((video, index) => {
        return (
          <VideoItem
            key={index}
            {...video}
            disableDelete={true}
            onClick={() => {
              const newVideo = {...video, selected: !video.selected};
              this.setState({
                videos: {
                  ...this.state.videos,
                  [video._id]: newVideo
                },
                selectedVideos: {
                  ...this.state.selectedVideos,
                  [video._id]: video
                }
              });
            }}
          />
        )
      })
    }
    </div>);
  }
}

export default VideoListModal;