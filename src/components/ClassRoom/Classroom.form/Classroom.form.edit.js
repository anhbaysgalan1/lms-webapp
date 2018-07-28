import React, { Component } from 'react';
import _ from 'lodash'
import  { withFormik, Formik } from 'formik';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import ClassRoom_list_teacher from '../Classroom.form/Classroom.AddTeachers_Members/Classroom.form.list.teachers';
import ClassRoom_list_teacher_not_in from '../Classroom.form/Classroom.AddTeachers_Members/Classroom.form.list.teachers.not.in';
import { withRouter } from 'react-router';


class ClassroomEditForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      show_add : false,
      list_teachers_not_in_class : this.props.list_teachers_not_in_class,
      list_teachers_in_class : this.props.list_teachers_in_class,
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.list_teachers_in_class !== this.props.list_teachers_in_class){
      this.setState({
        list_teachers_in_class : nextProps.list_teachers_in_class
      })
    }

    if (nextProps.list_teachers_not_in_class !== this.props.list_teachers_not_in_class){
      this.setState({
        list_teachers_not_in_class: nextProps.list_teachers_not_in_class
      })
    }
  }

  buttonAdd(){
    return(
      <Button
            className="admin-btn mr-2 text-dark"
            onClick={()=>{
              this.state.show_add ? this.setState({show_add : false}) : this.setState({show_add : true})
              this.setState({test_test : 3})
            }}
          >
            <i className="fas fa-plus mr-1"></i> {this.state.show_add ? "Close" : "Add Teachers into Class"}
      </Button>
      )
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

  renderTeachersNotInClass(){
    return <ClassRoom_list_teacher_not_in list_teachers={this.state.list_teachers_not_in_class} clickGetData={this.props.clickGetData} />
  }

  renderTeachers(){
    return <ClassRoom_list_teacher list_teachers={this.state.list_teachers_in_class} removeData={this.props.removeData} />    
  }


  renderMember(){
    const list_member_in_class = this.props.initialValues.members;
  }
  
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
         course, 
         _class
    } = values;

    if (!this.state.list_teachers_not_in_class || !this.state.list_teachers_in_class){
        return <div>Loading...</div>
    }
    // this.setState({
    //     list_teachers : [...this.state.list_teachers,"asdasdsad"]
    // })
    
    
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
    <div className="d-flex justify-content-end">{this.buttonAdd()}</div>
    <div id="listTeachers" className="mb-3">{this.renderTeachers()}</div>
    <div id="listTeachersNotIn" className="mb-3" style={{display: this.state.show_add ? "block" : "none"}}>{this.renderTeachersNotInClass()}</div>
    

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
      <div>
      <Formik
        initialValues={this.props.initialValues}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
      </div>
    );
  }
}

export default withRouter(ClassroomEditForm);