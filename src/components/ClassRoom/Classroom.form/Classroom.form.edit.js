import React, { Component } from 'react';
import _ from 'lodash'
import  { withFormik, Formik } from 'formik';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {RemoveDuplicate} from '../Methods';
import ClassRoom_list_teacher from '../Classroom.form/Classroom.form.list.edit';


class ClassroomEditForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    const errors = {};
    if (!values._class){
        errors._class = "Name is required!"
    }
    if (values.course === ""){
      errors.course = "Choose Your Course!"
    }
    return errors;
  }

  renderOption(){
    const list_data = this.props.data_name_course;
    return (
        list_data.map((el,i)=>{
            return ( 
            <option value={el.course} key={i}>{el.course}</option>)
        })
    )
  }


  renderMember(){
    const list_member_in_class = this.props.initialValues.members;
  }

  // renderTeachers(){
  //   const list_teachers_in_class = this.props.initialValues.teachers;
  //   const list_member_not_in_class = RemoveDuplicate(dummyUsers,list_teachers_in_class);
  //   return <ClassRoom_list_teacher list_teachers={list_member_not_in_class} list_teachers_exist = {list_teachers_in_class} />
  // }
  
  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = formProps;
    const {
         course, _class 
    } = values;
    
    return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
      <Label>Course</Label>
      <Input
        type='select'
        name='course'
        value={course}
        onBlur={handleBlur}
        onChange={handleChange}
        invalid={touched.course && !!errors.course}
      >
      <option key="0"  value="">Choose...</option> 
      {this.renderOption()}
      </Input>
      <div className="text-danger">{touched.course ? errors.course : ""}</div>
    </FormGroup>


    {/* Class */}
      <FormGroup>
      <Label>Class</Label>
      <Input
        type='number'
        name='_class'
        onBlur={handleBlur}
        onChange={handleChange}
        value={_class}
        invalid={touched._class && !!errors._class}
      >
      </Input>
      <div className="text-danger">{touched._class ? errors._class : ""}</div>
    </FormGroup>

    {/* Query List Users */}
    {/* <div>{this.renderTeachers()}</div> */}
    

    {/* Button */}
    <Button className="mx-1"
      onClick = {this.props.onCancel}
    >Back
    </Button>

    <Button className="btn btn-info">Submit</Button>
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

export default ClassroomEditForm;