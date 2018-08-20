import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleGoBack } from 'utils';

import { fetchCourseWithID, fetchCourse, updateCourse } from 'networks/classcourse';
import { FetchCourseAction } from '../../actions/classcourse';
import ClassroomFormEditCourse from './ClassroomCourse.form/Classroom.form.editcourse';

class ClassroomDetailCourse extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = ({
      fetchDataCourse: null,
      ListCourses: null,
      isSubmitting: false,
    });
  }

  async componentWillMount() {
    const { match } = this.props;
    const ID = match.params.id;
    const fetchDataCourse = await fetchCourseWithID(ID);
    const ListCourse = await fetchCourse();
    this.setState({
      fetchDataCourse,
      ListCourses: ListCourse.data,
    });
  }

  onSubmit(obj) {
    const objCourse = obj;
    const { history } = this.props;
    const { FetchCourseAction: FetchCourse } = this.props;
    this.setState({
      isSubmitting: true,
    });
    updateCourse(objCourse).then(() => {
      FetchCourse();
      handleGoBack(history);
    });
  }

  onCancel() {
    const { history } = this.props;
    handleGoBack(history);
  }

  render() {
    const { fetchDataCourse, ListCourses, isSubmitting } = this.state;
    if (!fetchDataCourse || isSubmitting) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }
    return (
      <ClassroomFormEditCourse
        initialValues={fetchDataCourse}
        DataCourse={ListCourses}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
      />
    );
  }
}

ClassroomDetailCourse.propTypes = {
  FetchCourseAction: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
  }).isRequired,
};

function mapReducerProps({ classcourseReducer }) {
  return { classcourseReducer };
}

const actions = {
  FetchCourseAction,
};

export default connect(mapReducerProps, actions)(ClassroomDetailCourse);
