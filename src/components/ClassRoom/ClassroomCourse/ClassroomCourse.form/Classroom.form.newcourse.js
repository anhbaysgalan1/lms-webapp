import React, { Component } from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';


class ClassroomFormNewCourse extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
  /* eslint-disable */
  validate(values) {
    const errors = {};
    const { fetchCourseData } = this.props;
    if (!values.newcourse) {
      errors.newcourse = 'New Course can\'t be blank!';
    }
    _.map(fetchCourseData, (el) => {
      if (values.newcourse.toLowerCase() === el.toLowerCase()) {
        errors.duplicate = 'This Course has been existed!';
        errors.flag = true;
      }
    });
    return errors;
  }

  /* eslint-enable */
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
            invalid={touched.newcourse && !!errors.newcourse && errors.flag}
          />
          <div className="text-danger">
            {console.log(errors)}
            {touched.newcourse ? errors.newcourse : ''}
            {errors.flag ? errors.duplicate : ''}
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

export default ClassroomFormNewCourse;
