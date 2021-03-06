import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { handleGoBack, JointCourseAndName } from 'utils';

import { fetchClassrooms, AddClassroom } from 'actions/classroom';
import { fetchCourse } from 'networks/classcourse';
import { fetchClass } from 'networks/classroom';
import ClassroomForm from './Classroom.form/Classroom.form';


class ClassroomNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = ({
      optionCourses: null,
      isSubmitting: false,
      dataFetch: null,
      session: null,
      a: null,
    });
  }

  async componentWillMount() {
    const fetchData = await fetchCourse();
    const dataFetch = await fetchClass();
    this.setState({
      dataFetch: dataFetch.data,
      optionCourses: fetchData.data,
    });
  }

  onSubmit(classroom) {
    const objClass = classroom;
    const ActionAddClassroom = _.get(this.props, 'AddClassroom');
    const history = _.get(this.props, 'history');
    const { optionCourses } = this.state;
    this.setState({
      isSubmitting: true,
    });
    let flag = true;
    _.map(optionCourses, (choose) => {
      if (flag && objClass.course === choose.course) {
        objClass.session = choose.session;
        flag = false;
      }
    });
    ActionAddClassroom(objClass).then(
      () => {
        handleGoBack(history);
      },
    );
  }

  render() {
    const optionCourses = _.get(this.state, 'optionCourses');
    const history = _.get(this.props, 'history');
    const isSubmitting = _.get(this.state, 'isSubmitting');
    const { dataFetch } = this.state;
    const ListCourseAndName = JointCourseAndName(dataFetch);
    if (!optionCourses) {
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
        {isSubmitting ? (
          <div className="d-flex justify-content-center">
            {/* eslint-disable global-require */}
            <img alt="" src={require('../../statics/loader.gif')} />
            {/* eslint-enable global-require */}
          </div>
        )
          : (
            <ClassroomForm
              initialValues={{
                course: '',
                classroom: '',
                teachers: [],
                members: [],
                session: 0,
              }}
              ListCourseAndName={ListCourseAndName}
              data_name_course={optionCourses}
              onSubmit={this.onSubmit}
              onCancel={() => { handleGoBack(history); }}
            />
          )}

      </div>
    );
  }
}

const actions = {
  fetchClassrooms,
  AddClassroom,
};

function MapsConnectReducer({ classroomReducer }) {
  return { classroomReducer };
}

export default connect(MapsConnectReducer, actions)(ClassroomNew);
