import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { fetchCourseWithID } from '../../../../networks/classcourse';

class ClassroomDetailCourse extends Component {
  constructor(props) {
    super(props);
    // this.onSubmit = this.onSubmit.bind(this);
    this.state = ({
      fetchDataCourse: null,
    });
  }

  async componentWillMount() {
    const { match } = this.props;
    const ID = match.params.id;
    const fetchDataCourse = await fetchCourseWithID(ID);
    this.setState({
      fetchDataCourse,
    });
    console.log(this.state.fetchDataCourse);
  }

  static onSubmit() {
    console.log('asdasd');
  }

  SomeMethod() {
    this.onSubmit();
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
      newcourse, session,
    } = values;

    const onCancel = _.get(this.props, 'onCancel');
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
Name Course
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
Session
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

  render() {
    const { fetchDataCourse } = this.state;
    console.log(this.SomeMethod);
    return (
      // <Formik
      //   initialValues={fetchDataCourse}
      //   // validate={this.validate}
      //   // onSubmit={this.onSubmit}
      //   render={this.renderForm}
      // />
      <div>
Hello
      </div>
    );
  }
}

ClassroomDetailCourse.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
};


export default ClassroomDetailCourse;
