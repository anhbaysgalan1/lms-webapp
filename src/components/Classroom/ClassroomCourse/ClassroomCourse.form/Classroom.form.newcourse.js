import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { FetchCourseAction } from '../../../../actions/classcourse';
import { ListStringCourse } from '../../../../utils';


class ClassroomFormNewCourse extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentWillMount() {
    const classcourseReducer = _.get(this.props, 'classcourseReducer');
    const PropsFetchCourseAction = _.get(this.props, 'FetchCourseAction');
    if (!classcourseReducer) {
      PropsFetchCourseAction();
    }
  }

  componentDidMount() {
    const classcourseReducer = _.get(this.props, 'classcourseReducer');
    const PropsFetchCourseAction = _.get(this.props, 'FetchCourseAction');
    if (!classcourseReducer) {
      PropsFetchCourseAction();
    }
  }
  /* eslint-disable */
  validate(values) {
    const errors = {};
    const { classcourseReducer } = this.props;
    const ListCourse = ListStringCourse(classcourseReducer);
    if (!values.newcourse) {
      errors.newcourse = 'New Course can\'t be blank!';
    }

    if (!values.session) {
      errors.session = 'Session can\'t be blank!';
    }
    // fetchCourseData
    _.map(ListCourse, (el) => {
      if (values.newcourse.toUpperCase() === el.toUpperCase()) {
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
      newcourse, session,
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

function mapReducerProps({ classcourseReducer }) {
  return { classcourseReducer };
}

const actions = {
  FetchCourseAction,
};

export default connect(mapReducerProps, actions)(ClassroomFormNewCourse);
