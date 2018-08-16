import React, { Component } from 'react';
import { Formik } from 'formik';
import {
  Form, FormGroup, Input, Button, Label,
} from 'reactstrap';
import _ from 'lodash';

import getYoutubeVideoInfo from 'networks/youtube';

import './index.css';

class VideoForm extends Component {
  constructor(props) {
    super(props);

    this.getYoutubeVideoId = (text) => {
      const re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
      if (re.test(text)) {
        return text.replace(re, '$1');
      }
      return false;
    };

    this.checkYoutubeVideoId = (videoId, formProps) => {
      const {
        values, errors, setValues, setErrors,
      } = formProps;

      if (videoId) {
        getYoutubeVideoInfo(videoId)
          .then((videos) => {
            const video = videos.items[0];
            if (videos.items.length === 0 || (video && video.kind !== 'youtube#video')) {
              setErrors({
                ...errors,
                videoId: 'Wrong youtube video id',
              });
            } else {
              const { duration } = video.contentDetails;
              setErrors({
                ...errors,
                videoId: undefined,
              });
              setValues({
                ...values,
                videoId: video.id,
                title: video.snippet.title,
                description: video.snippet.description,
                duration: duration.slice(2, duration.length),
              });
            }
          });
      }
    };

    this.validate = (values) => {
      const errors = {};

      if (!values.videoId) {
        errors.videoId = 'Video Id is required';
      }

      return errors;
    };

    this.renderForm = this.renderForm.bind(this);
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldTouched,
    } = formProps;

    const {
      title = '', description = '', videoId = '', duration = '',
    } = values;

    const onCancel = _.get(this.props, 'onCancel');

    return (
      <Form onSubmit={handleSubmit} className="video-form">
        <FormGroup>
          <Label for="title">
            Video title
          </Label>
          <Input
            type="text"
            name="title"
            value={title}
            invalid={touched.title && !!errors.title}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">
            {
              touched.title ? errors.title : ''
            }
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="description">
            Video description
          </Label>
          <Input
            type="textarea"
            name="description"
            value={description}
            invalid={touched.description && !!errors.description}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">
            {touched.description ? errors.description : ''}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="duration">
            Video duration
          </Label>
          <Input
            type="textarea"
            name="duration"
            value={duration}
            invalid={touched.duration && !!errors.duration}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">
            {touched.duration ? errors.duration : ''}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="videoId">
            Video Id
            <span className="text-danger">
               *
            </span>
          </Label>
          <Input
            type="text"
            name="videoId"
            value={videoId}
            invalid={touched.videoId && !!errors.videoId}
            onBlur={(e) => {
              handleBlur(e);
              this.checkYoutubeVideoId(e.target.value, formProps);
            }}
            onChange={(e) => {
              setFieldTouched(e.target.name, true);
              if (this.getYoutubeVideoId(e.target.value)) {
                e.target.value = this.getYoutubeVideoId(e.target.value);
                handleChange(e);
              } else {
                handleChange(e);
              }
              this.checkYoutubeVideoId(e.target.value, formProps);
            }}
            placeholder="Paste youtube link here."
          />
          <div className="text-danger">
            {touched.videoId ? errors.videoId : ''}
          </div>
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="mx-1" color="primary" disabled={!!errors.videoId}>
            OK
          </Button>
        </div>
      </Form>
    );
  }

  render() {
    const initialValues = _.get(this.props, 'initialValues');
    const onSubmit = _.get(this.props, 'onSubmit');

    return (
      <Formik
        initialValues={initialValues}
        validate={this.validate}
        onSubmit={onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default VideoForm;
