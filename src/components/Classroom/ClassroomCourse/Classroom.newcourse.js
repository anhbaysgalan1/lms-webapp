import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AddCourseAction, FetchCourseAction } from '../../../actions/classcourse';
import { fetchCourse } from '../../../networks/classcourse';
import ClassroomFormNewCourse from './ClassroomCourse.form/Classroom.form.newcourse';
import ClassroomListCourse from './ClassroomCourse.form/Classroom.list.course';
import { ListStringCourse } from '../../../utils';

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
    const PropsHistory = _.get(this.props, 'history');
    PropsHistory.goBack();
  }

  render() {
    const { fetchCourseData } = this.state;
    const PropsHistory = _.get(this.props, 'history');
    if (!fetchCourseData) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../../statics/loader.gif')} />
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
        <ClassroomListCourse
          PropsHistory={PropsHistory}
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