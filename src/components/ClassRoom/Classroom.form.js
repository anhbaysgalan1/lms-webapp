import React, { Component } from 'react';
import {connect} from 'react-redux';
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
    if (!values.name_class){
        errors.name_class = "Name is required!"
    }
    if (values.course === ""){
      errors.course = "Choose Your Course!"
    }
    return errors;
  }

  
  renderOption(){
    const data_obj = this.props.data_name_course;
    const filter = _.mapKeys(data_obj,"name");
    // console.log(filter);
    const list_data = Object.keys(filter);
    return (
        list_data.map((el,i)=>{
            return ( 
            <option value={el} key={i}>{el}</option>)
        })
    )
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

    const {
        name_class,course,id_form
      } = values;
      
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
      <option value="">Choose...</option> 
      {this.renderOption()}
      </Input>
      <div className="text-danger">{touched.course ? errors.course : ""}</div>
    </FormGroup>


    {/* Class */}
    <FormGroup>
      <Label>Class</Label>
      <Input
        type='number'
        name='name_class'
        onBlur={handleBlur}
        onChange={handleChange}
        value={name_class}
        invalid={touched.name_class && !!errors.name_class}
      >
      </Input>
      <div className="text-danger">{touched.name_class ? errors.name_class : ""}</div>
    </FormGroup>
    <Button>Send Nude</Button>
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