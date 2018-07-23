import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { updateVideo, fetchVideoDetail } from 'actions/video';
import VideoForm from './Video.form';

class VideoDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const videoId = this.props.match.params.id;
    this.props.fetchVideoDetail(videoId)
      .then(() => {
        this.setState({loading: false});
      })
      .catch(() => {
        this.setState({loading: false});
      });
  }

  onSubmit(video) {
    this.setState({loading: true});
    console.log(this.state)
    this.props.updateVideo(video)
      .then(() => {
        this.props.history.goBack();
      })
      .catch(() => {
        this.props.history.goBack();
      });
  }

  render() {
    const videoId = this.props.match.params.id;
    if(this.state.loading) return <div>Loading...</div>
    else return (
      <div>
        <div className="round-panel">
          <VideoForm
            initialValues={this.props.videoReducer[videoId]}
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