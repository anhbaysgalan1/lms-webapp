import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AddCourseAction, FetchCourseAction } from '../../../actions/classcourse';
import ClassroomFormNewCourse from './ClassroomCourse.form/Classroom.form.newcourse';
import ClassroomListCourse from './ClassroomCourse.form/Classroom.list.course';

class ClassroomNewCourse extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(course) {
    const AddCourse = _.get(this.props, 'AddCourseAction');
    AddCourse(course);
    this.onCancel();
  }

  onCancel() {
    const PropsHistory = _.get(this.props, 'history');
    PropsHistory.goBack();
  }

  render() {
    return (
      <div>
        <ClassroomFormNewCourse
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          initialValues={{
            newcourse: '',
          }}
        />
        <ClassroomListCourse />
      </div>
    );
  }
}

function mapReducerProps({ classroomReducer }) {
  return { classroomReducer };
}

const actions = {
  FetchCourseAction,
  AddCourseAction,
};

export default connect(mapReducerProps, actions)(ClassroomNewCourse);
