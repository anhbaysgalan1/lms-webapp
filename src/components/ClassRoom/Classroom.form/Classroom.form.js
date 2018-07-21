import React, { Component } from 'react';
import _ from 'lodash'
import  { withFormik, Formik } from 'formik';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


class ClassroomForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  checkDataNull(data){
    if (data == null){
        return false
    }
    else {return true}
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
    if (this.props.data_name_course != null){
      const list_data = this.props.data_name_course;
      return (
        list_data.map((el,i)=>{
            return ( 
            <option value={el.course} key={i}>{el.course}</option>)
        })
    )
    }
  }


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
      isSubmitting,
    } = formProps;

    //Values in here must be like initialValues in Component New!!
    const {
      course, _class 
      } = values;
    // console.log(_class);
    
    let _flag = true

    return (
    <Form onSubmit={handleSubmit}>

    {/* Course */}
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

    {/* Button */}
    <Button className="mx-1"
      onClick = {this.props.onCancel}
    >Back
    </Button>
    <Button className="btn btn-info">Add</Button>
    </Form>);
  }

//   onSubmit(values, {setSubmitting, setErrors}) {
//   }

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


export default ClassroomForm;