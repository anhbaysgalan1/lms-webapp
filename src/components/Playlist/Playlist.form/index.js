import _ from 'lodash';
import React, { Component } from 'react';
import  { Formik } from 'formik';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import './index.css';
import VideoItem from './VideoItem';
import VideoListModal from './VideoList.modal';

class PlaylistForm extends Component {
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
    if(!values.title) {
      errors.title = "Title is required";
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

    const {title, videos} = values;
    return (
      <Form onSubmit={handleSubmit} className="playlist-form">
        <FormGroup>
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
        <FormGroup className="videos">
          <div className="topbar">
            <Button
              size="sm" color="secondary"
              onClick={() => this.setState({videolistModalOpen: true})}
            >Add video</Button>
          </div>
          <VideoListModal
            isOpen={this.state.videolistModalOpen}
            toggle={() => this.setState({videolistModalOpen: false})}
            onOK={(newVideos) => setFieldValue("videos", _.unionBy(videos, newVideos, "_id"))}
          />
          {
            videos.map((video, index) => {
              return <VideoItem 
                        {...video}
                        key={index}
                        onDeleteClick={() => {
                          const newVideos = videos.filter((vid) => vid !== video);
                          setFieldValue("videos", newVideos);
                        }}
                        playlistName={title}
                      />
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