import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addVideo } from 'actions/video';
import VideoForm from './Video.form'; 
  
class VideoNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(video) {
    this.props.addVideo(video);
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <div className="round-panel">
          <VideoForm
            initialValues={{
              title: "",
              description: "",
              videoId: "",
            }}
            onSubmit={this.onSubmit}
            onCancel={this.props.history.goBack}
          />
        </div>
      </div>
    );
  }
}
  
  
export default connect(null, {addVideo})(VideoNew);