import React, { Component } from 'react';
import  { Formik } from 'formik';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

import './index.css';

class VideoForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      videolistModalOpen: false
    };
  }

  validate(values) {
    const errors = {};
    if(!values.videoId) {
      errors.videoId = "Video Id is required";
    }
    return errors;
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
    } = formProps;

    const {title, description, videoId} = values;
    return (
      <Form onSubmit={handleSubmit} className="video-form">
        <FormGroup>
          <Label for="title">Video title</Label>
          <Input
            type='text'
            name='title'
            value={title}
            invalid={touched.title && !!errors.title}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.title ? errors.title : ""}</div>
        </FormGroup>
        <FormGroup>
          <Label for="description">Video description</Label>
          <Input
            type='textarea'
            name='description'
            value={description}
            invalid={touched.description && !!errors.description}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.description ? errors.description : ""}</div>
        </FormGroup>
        <FormGroup>
          <Label for="videoId">Video Id <span className="text-danger">*</span></Label>
          <Input
            type='text'
            name='videoId'
            value={videoId}
            invalid={touched.videoId && !!errors.videoId}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.videoId ? errors.videoId : ""}</div>
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color="secondary" onClick={this.props.onCancel} >
            Cancel
          </Button>
          <Button className="mx-1" color="primary">OK</Button>
        </div>
        
      </Form>
    );
  }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default VideoForm;