import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { handleGoBack } from 'utils';

import { addVideo } from 'actions/video';
import VideoForm from './Video.form';

class VideoNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(video) {
    const addVideoAction = _.get(this.props, 'addVideo');
    const history = _.get(this.props, 'history');
    this.setState({ isLoading: true });
    addVideoAction(video)
      .then(() => {
        handleGoBack(history);
      });
  }

  render() {
    const isLoading = _.get(this.state, 'isLoading');
    const history = _.get(this.props, 'history');
    return (
      isLoading ? (
        <div>
          Loading....
        </div>
      ) : (
        <div>
          <div className="round-panel">
            <VideoForm
              initialValues={{
                title: '',
                description: '',
                videoId: '',
              }}
              onSubmit={this.onSubmit}
              onCancel={() => { handleGoBack(history); }}
            />
          </div>
        </div>
      )
    );
  }
}

export default connect(null, { addVideo })(VideoNew);
