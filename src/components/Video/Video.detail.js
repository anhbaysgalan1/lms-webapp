import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { updateVideo, fetchVideoDetail } from 'actions/video';
import VideoForm from './Video.form';

class VideoDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const videoId = this.props.match.params._id;
    this.props.fetchVideoDetail(videoId)
      .then(() => {
        this.setState({isLoading: false});
      })
      .catch(() => {
        this.setState({isLoading: false});
      });
  }

  onSubmit(video) {
    this.setState({isLoading: true});
    this.props.updateVideo(video)
      .then(() => {
        this.props.history.goBack();
      })
      .catch(() => {
        this.props.history.goBack();
      });
  }

  render() {
    const videoId = this.props.match.params._id;
    if(this.state.isLoading) return <div>Loading...</div>
    else return (
      <div>
        <div className="round-panel">
          <VideoForm
            initialValues={this.props.videoReducer}
            onSubmit={this.onSubmit}
            onCancel={this.props.history.goBack}
          />
        </div>
      </div>
    );
  }
}

function mapReducerProps({ videoReducer }) {
  return { videoReducer };
}

const actions = {
  updateVideo,
  fetchVideoDetail
}

  
export default connect(mapReducerProps, actions)(VideoDetail);