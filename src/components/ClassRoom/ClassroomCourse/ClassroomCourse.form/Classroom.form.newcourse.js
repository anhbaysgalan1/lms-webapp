import React, { Component } from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';


class ClassroomFormNewCourse extends Component {
  static validate(values) {
    const errors = {};
    if (!values.newcourse) {
      errors.newcourse = 'New Course can\'t be blank!';
    }
    return errors;
  }

  constructor(props) {
    super(props);
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
      // isSubmitting,
    } = formProps;

    const {
      newcourse,
    } = values;

    const onCancel = _.get(this.props, 'onCancel');
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
New Course
          </Label>
          <Input
            type="text"
            name="newcourse"
            value={newcourse}
            onBlur={handleBlur}
            onChange={handleChange}
            invalid={touched.newcourse && !!errors.newcourse}
          />
          <div className="text-danger">
            {touched.newcourse ? errors.newcourse : ''}
          </div>
        </FormGroup>

        <Button
          className="mx-1"
          onClick={onCancel}
        >
Back

        </Button>
        <Button className="btn btn-info ">
Add
        </Button>

      </Form>

    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    const initialValues = _.get(this.props, 'initialValues');
    const validate = _.get(this.props, 'validate');
    const onSubmit = _.get(this.props, 'onSubmit');
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

export default ClassroomFormNewCourse;
