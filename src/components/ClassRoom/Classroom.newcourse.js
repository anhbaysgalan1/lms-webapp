import React, { Component } from 'react';
import ClassroomFormNewCourse from './Classroom.form/Classroom.form.newcourse';
import {AddCourseAction, FetchCourseAction, } from '../../actions/classcourse';
import {connect} from 'react-redux';
import ClassroomListCourse from './Classroom.form/Classroom.list.course';
  
class ClassroomNewCourse extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onSubmit(course){
        // console.log(course);
        this.props.AddCourseAction(course)
        // this.onCancel();
    }
    onCancel(){
        this.props.history.goBack()
    }
    render() {
    return (
      <div>
          <ClassroomFormNewCourse 
                onCancel = {this.onCancel}
                onSubmit = {this.onSubmit}
                initialValues = {{
                    newcourse : ""
                }}
          />
          <ClassroomListCourse />
      </div>
    );
  }
}

function mapReducerProps({classroomReducer}){
    return {classroomReducer};
}

const actions = {
    FetchCourseAction,
    AddCourseAction
}
   
export default connect(mapReducerProps,actions)(ClassroomNewCourse);