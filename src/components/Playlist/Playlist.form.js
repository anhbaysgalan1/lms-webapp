import React, { Component } from 'react';
import  { Formik } from 'formik';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { withRouter } from 'react-router-dom';

import './Playlist.form.css';
import VideoItem from './VideoItem';

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    const errors = {};
    if(!values.name) {
      errors.name = "Name is required";
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

    const {name, videos} = values;
    return (
      <Form onSubmit={handleSubmit} className="playlist-form">
        <FormGroup>
          <legend>Name</legend>
          <Input
            type='text'
            name='name'
            value={name}
            invalid={touched.name && !!errors.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.name ? errors.name : ""}</div>
        </FormGroup>
        <FormGroup className="videos">
          <legend>Videos</legend>
          {
            videos.map((video, index) => {
              return <VideoItem key={index} {...video} onDeleteClick={() => console.log("Delete")} />
            })
          }
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button
            color="secondary"
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
          <Button className="mx-1" color="primary">OK</Button>
        </div>
        
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

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

export default PlaylistForm;