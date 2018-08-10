import React, { Component } from 'react';
import { Formik } from 'formik';
import {
  Form, FormGroup, Input, Button, Label,
} from 'reactstrap';
import _ from 'lodash';

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
    } = formProps;

    const { title, description, videoId } = values;

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
            onBlur={handleBlur}
            onChange={(e) => {
              if (this.getYoutubeVideoId(e.target.value)) {
                e.target.value = this.getYoutubeVideoId(e.target.value);
                handleChange(e);
              } else {
                handleChange(e);
              }
            }}
            placeholder="Paste link youtube vào đây."
          />
          <div className="text-danger">
            {touched.videoId ? errors.videoId : ''}
          </div>
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color="secondary" onClick={onCancel}>
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
