import React, { Component } from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';

class ClassroomForm extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.validate = this.validate.bind(this);
  }

  /*eslint-disable */
   validate(values) {
    const ListCourseAndName = this.props.ListCourseAndName;
    const errors = {};
    if (!values._class) {
      errors._class = 'Name is required!';
    }
    if (values.course === '') {
      errors.course = 'Choose Your Course!';
    }
    let flag = false
    _.map(ListCourseAndName,el=>{
      let stringDuplicate = values.course + values._class
      if (stringDuplicate === el){
        errors.duplicate = 'This class have been existed!';
        errors.flag = true
      }
    })

    return errors;
  }
  /* eslint-enable */

  renderForm(formProps) {
    // console.log("Form Side");
    // console.log(this.props.data_name_course);


    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      // isSubmitting,
    } = formProps;

    // Values in here must be like initialValues in Component New!!
    const {
      course, _class,
    } = values;
    // console.log(_class);
    const onCancel = _.get(this.props, 'onCancel');

    return (
      <Form onSubmit={handleSubmit}>

        {/* Course */}
        <FormGroup>
          <Label>
            Course
          </Label>
          <Input
            type="select"
            name="course"
            value={course}
            onBlur={handleBlur}
            onChange={handleChange}
            invalid={touched.course && !!errors.course}
          >
            <option key="0" value="">
              Choose...
            </option>
            {this.renderOption()}
          </Input>
          <div className="text-danger">
            {touched.course ? errors.course : ''}
          </div>
        </FormGroup>

        {/*eslint-disable */}
        {/* Class */}
        <FormGroup>
          <Label>
            Class
          </Label>
          <Input
            type="number"
            name="_class"
            onBlur={handleBlur}
            onChange={handleChange}
            value={_class}
            invalid={touched._class && !!errors._class && !!errors.flag}
          />
          <div className="text-danger">
            {touched._class ? errors._class : ''}
            {errors.flag ? errors.duplicate : ''}
          </div>
        </FormGroup>

        {/* Button */}
        <Button
          className="mx-1"
          onClick={onCancel}
        >
Back
        </Button>
        <Button className="btn btn-info">
Add
        </Button>
      </Form>);
  }

  //   onSubmit(values, {setSubmitting, setErrors}) {
  //   }
  renderOption() {
    const dataNameCourse = _.get(this.props, 'data_name_course');
    if (dataNameCourse != null) {
      const listData = dataNameCourse;
      return (
        listData.map(el => (
          <option value={el.course} key={el._id}>
            {el.course}
          </option>))
      );
    }
    return false;
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


export default ClassroomForm;
