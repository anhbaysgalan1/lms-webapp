import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { handleGoBack } from 'utils';

import { updateVideo, fetchVideoDetail } from 'actions/video';
import VideoForm from './Video.form';

class VideoDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const videoId = _.get(this.props, 'match.params.id');
    const actionFetchVideoDetail = _.get(this.props, 'fetchVideoDetail');

    actionFetchVideoDetail(videoId)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  onSubmit(video) {
    this.setState({ isLoading: true });
    const actionUpdateVideo = _.get(this.props, 'updateVideo');
    const history = _.get(this.props, 'history');

    actionUpdateVideo(video)
      .then(() => {
        handleGoBack(history);
      })
      .catch(() => {
        handleGoBack(history);
      });
  }

  render() {
    const { isLoading } = this.state;
    const videoReducer = _.get(this.props, 'videoReducer');
    const history = _.get(this.props, 'history');

    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div>
        <div className="round-panel">
          <VideoForm
            initialValues={videoReducer}
            onSubmit={this.onSubmit}
            onCancel={() => { handleGoBack(history); }}
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
  fetchVideoDetail,
};

export default connect(mapReducerProps, actions)(VideoDetail);
