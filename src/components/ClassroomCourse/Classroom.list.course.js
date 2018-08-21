import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FetchCourseAction, DeleteCourseAction } from '../../actions/classcourse';
import { openPopup } from '../../actions/popup';
import '../Classroom/index';
import { ROUTE_ADMIN_CLASSROOM_NEW_COURSE } from '../routes';

class ClassroomListCourse extends Component {
  componentWillMount() {
    const classcourseReducer = _.get(this.props, 'classcourseReducer');
    const PropsFetchCourseAction = _.get(this.props, 'FetchCourseAction');
    if (!classcourseReducer) {
      PropsFetchCourseAction();
    }
  }

  buttonAdd() {
    const PropsHistory = _.get(this.props, 'history');
    return (
      <div className="admin-controls">
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => PropsHistory.push(ROUTE_ADMIN_CLASSROOM_NEW_COURSE)}
        >
          <i className="fas fa-plus mr-1" />
          {' '}
          {'  '}
          {' '}
Add Course
        </Button>
        {/* {this.renderAddCourse()} */}
      </div>
    );
  }

  render() {
    const listCourse = _.get(this.props, 'classcourseReducer');
    const ActionPopup = _.get(this.props, 'openPopup');
    const ActionDeleteCourse = _.get(this.props, 'DeleteCourseAction');
    const { history: PropsHistory } = this.props;
    const classcourseReducer = _.get(this.props, 'classcourseReducer');
    if (!classcourseReducer) {
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
        {this.buttonAdd()}
        <div className="round-panel_cls mt-4">
          {
        _.values(listCourse).map((course, index) => (
          <div
            className="classroom-item"
            role="button"
            tabIndex="-1"
            key={course._id}
            onClick={() => { PropsHistory.push(`course/detail/${course._id}`); }}
            onKeyPress={() => {}}
          >
            <div className="no">
              { index + 1 }
            </div>
            <div className="name">
              { course.course }
              {/* eslint-disable */}
              { course.classroom }
            </div>
            <div className="name2">{ course.session }</div>
            {/* <div className="name2">{course.teachers.length} Teachers</div> */}
            <div className="video-count" />
            <div
              className="controls"
              onKeyDown={() => {}}
              tabIndex="-1"
              role="button"
              onClick={(event) => {
                event.stopPropagation();
                ActionPopup(() => { ActionDeleteCourse(course); }, null);
              }}
            >
              <div className="delete">
                <i className="text-dark fas fa-trash-alt" />
              </div>
            </div>
          </div>
        ))
  }
      </div>
      </div>
    );
  }
}

ClassroomListCourse.propTypes = {
  history : PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
}

function mapReducerProps({ classcourseReducer }) {
  return { classcourseReducer };
}

const actions = {
  FetchCourseAction,
  DeleteCourseAction,
  openPopup,
};

export default connect(mapReducerProps, actions)(ClassroomListCourse);
