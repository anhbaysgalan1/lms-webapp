import React, { Component } from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { ListStringCourse } from '../../../../utils';


class ClassroomFormEditCourse extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentWillMount() {
  }
  /* eslint-disable */
  validate(values) {
    const errors = {};
    const { DataCourse, initialValues } = this.props;
    const CurrentCourse = initialValues.course;
    const ListCourse = ListStringCourse(DataCourse);
    if (!values.course) {
      errors.course = 'New Course can\'t be blank!';
    }

    if (!values.session) {
      errors.session = 'Session can\'t be blank!';
    }
    // fetchCourseData
    _.map(ListCourse, (el) => {
      if (CurrentCourse.toUpperCase() !== values.course.toUpperCase() && values.course.toUpperCase() === el.toUpperCase()) {
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
      course, session,
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
            name="course"
            value={course}
            onBlur={handleBlur}
            onChange={handleChange}
            invalid={touched.newcourse && !!errors.newcourse && errors.flag}
          />
          <div className="text-danger">
            {touched.newcourse ? errors.newcourse : ''}
            {errors.flag ? errors.duplicate : ''}
          </div>
        </FormGroup>

        <FormGroup>
          <Label>
Number Session
          </Label>
          <Input
            type="number"
            name="session"
            value={session}
            onBlur={handleBlur}
            onChange={handleChange}
            invalid={touched.session && !!errors.session}
          />
          <div className="text-danger">
            {touched.session ? errors.session : ''}
          </div>
        </FormGroup>

        <Button
          className="mx-1"
          onClick={onCancel}
        >
Back

        </Button>
        <Button className="btn btn-info ">
Edit
        </Button>

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

export default ClassroomFormEditCourse;
