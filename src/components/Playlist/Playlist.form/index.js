import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

import './index.css';
import { openVideoPlayer } from 'actions/videoPlayer';
import VideoItem from 'components/Video/VideoItem';
import VideoListModal from './VideoList.modal';

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  return errors;
}

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      videolistModalOpen: false,
    };
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
    } = formProps;

    const { title, videos } = values;
    const { videolistModalOpen } = this.state;
    const { onCancel, openVideoPlayerAction } = this.props;
    return (
      <Form onSubmit={handleSubmit} className="playlist-form">
        <FormGroup>
          <Input
            type="text"
            name="title"
            value={title}
            invalid={touched.title && !!errors.title}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">
            {touched.title ? errors.title : ''}
          </div>
        </FormGroup>
        <FormGroup className="videos">
          <div className="topbar">
            <Button
              size="sm"
              color="secondary"
              onClick={() => this.setState({ videolistModalOpen: true })}
            >
              Add video
            </Button>
          </div>
          <VideoListModal
            isOpen={videolistModalOpen}
            toggle={() => this.setState({ videolistModalOpen: false })}
            onOK={(newVideos) => {
              setFieldValue('videos', _.unionBy(videos, newVideos, '_id'));
            }}
          />
          {
            videos.map((video, index) => (
              <VideoItem
                index={index}
                {...video}
                key={video._id}
                onDeleteClick={() => {
                  const newVideos = videos.filter(vid => vid !== video);
                  setFieldValue('videos', newVideos);
                }}
                onClick={() => openVideoPlayerAction(video.videoId)}
                playlistName={title}
                {...video}
              />))
          }
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button
            color="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button className="mx-1" color="primary">
            OK
          </Button>
        </div>
      </Form>
    );
  }

  render() {
    const { initialValues, onSubmit } = this.props;
    return (
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
        render={this.renderForm}
      />
    );
  }
}

PlaylistForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
  }).isRequired,
  openVideoPlayerAction: PropTypes.func.isRequired,
};

const actions = {
  openVideoPlayerAction: openVideoPlayer,
};

export default connect(null, actions)(PlaylistForm);
