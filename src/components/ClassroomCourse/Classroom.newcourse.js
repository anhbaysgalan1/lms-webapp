import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { handleGoBack, ListStringCourse } from 'utils';

import { AddCourseAction, FetchCourseAction } from 'actions/classcourse';
import { fetchCourse } from 'networks/classcourse';
import ClassroomFormNewCourse from './ClassroomCourse.form/Classroom.form.newcourse';


class ClassroomNewCourse extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = ({
      fetchCourseData: null,
    });
  }

  async componentWillMount() {
    const fetchCourseData = await fetchCourse();
    const dataStringCourse = ListStringCourse(fetchCourseData.data);
    this.setState({
      fetchCourseData: dataStringCourse,
    });
  }

  onSubmit(course) {
    const AddCourse = _.get(this.props, 'AddCourseAction');
    AddCourse(course);
    this.onCancel();
  }

  onCancel() {
    const history = _.get(this.props, 'history');
    handleGoBack(history);
  }

  render() {
    const { fetchCourseData } = this.state;
    if (!fetchCourseData) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }
    return (
      <div>
        <ClassroomFormNewCourse
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          fetchCourseData={fetchCourseData}
          initialValues={{
            newcourse: '',
            session: '',
          }}
        />
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
