import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ClassroomForm from './Classroom.form/Classroom.form';
import { fetchClassrooms, AddClassroom } from '../../actions/classroom';
import { fetchCourse } from '../../networks/classcourse';


class ClassroomNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = ({
      optionCourses: null,
      isSubmitting: false,
    });
  }

  async componentWillMount() {
    const fetchData = await fetchCourse();
    this.setState({
      optionCourses: fetchData.data,
    });
  }

  onSubmit(_class) {
    const ActionAddClassroom = _.get(this.props, 'AddClassroom');
    const PropsHistory = _.get(this.props, 'history');
    this.setState({
      isSubmitting: true,
    });
    ActionAddClassroom(_class).then(
      () => {
        PropsHistory.goBack();
      },
    );
  }

  render() {
    const optionCourses = _.get(this.state, 'optionCourses');
    const PropsHistory = _.get(this.props, 'history');
    const isSubmitting = _.get(this.state, 'isSubmitting');
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
          <div>
        Submitting....
          </div>
        )
          : (
            <ClassroomForm
              initialValues={{
                course: '',
                _class: '',
                teachers: [],
                members: [],
              }}
              data_name_course={optionCourses}
              onSubmit={this.onSubmit}
              onCancel={PropsHistory.goBack}
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
