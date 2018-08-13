import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassroomFormEditCourse from './ClassroomCourse.form/Classroom.form.editcourse';
import { fetchCourseWithID, fetchCourse, updateCourse } from '../../../networks/classcourse';

class ClassroomDetailCourse extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = ({
      fetchDataCourse: null,
      ListCourses: null,
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
    updateCourse(objCourse);
    history.goBack();
  }

  onCancel() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { fetchDataCourse, ListCourses } = this.state;
    if (!fetchDataCourse) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../../statics/loader.gif')} />
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
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
  }).isRequired,
};


export default ClassroomDetailCourse;
