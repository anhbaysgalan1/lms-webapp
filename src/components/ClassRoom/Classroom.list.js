import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

// action
import { fetchClassrooms, deleteClassroom } from '../../actions/classroom';
// route_path
import { ROUTE_ADMIN_CLASSROOM_NEW, ROUTE_ADMIN_CLASSROOM_DETAIL, ROUTE_ADMIN_CLASSROOM_NEW_COURSE } from '../routes';

import { openPopup } from '../../actions/popup';
import './index.css';


class ClassRoomList extends Component {
  componentWillMount() {
    const PropsFetchClassrooms = _.get(this.props, 'fetchClassrooms');
    PropsFetchClassrooms();
  }

  renderAddCourse() {
    const PropsHistory = _.get(this.props, 'history');
    return (
      <Button
        className="admin-btn mr-2 text-dark"
        onClick={() => PropsHistory.push(ROUTE_ADMIN_CLASSROOM_NEW_COURSE)}
      >
        <i className="fas fa-plus mr-1" />
        {' '}
        {'  '}
        {' '}
Course

      </Button>
    );
  }

  renderAdd() {
    const PropsHistory = _.get(this.props, 'history');
    return (
      <div className="admin-controls">
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => PropsHistory.push(ROUTE_ADMIN_CLASSROOM_NEW)}
        >
          <i className="fas fa-plus mr-1" />
          {' '}
          {'  '}
          {' '}
Add Class

        </Button>
        {this.renderAddCourse()}

      </div>
    );
  }

  renderList() {
    const classroomReducer = _.get(this.props, 'classroomReducer');
    const PropsopenPopup = _.get(this.props, 'openPopup');
    const PropsdeleteClassroom = _.get(this.props, 'deleteClassroom');
    const PropsHistory = _.get(this.props, 'history');
    if (!classroomReducer) {
      return (
        <div>
Loading...
        </div>
      );
    }

    return (
      <div className="round-panel_cls">
        {
_.values(classroomReducer).map((_classroom, index) => (
  <div
    className="classroom-item"
    key={_classroom._id}
    onClick={() => PropsHistory.push(`${ROUTE_ADMIN_CLASSROOM_DETAIL}/${_classroom._id}`)}
    onKeyDown={() => {}}
    role="button"
    tabIndex="0"
  >
    <div className="no">
      { index + 1 }
    </div>
    <div className="name">
      { _classroom.course }
      {/* eslint-disable */}
      { _classroom._class }
    </div>
    <div className="name2">
      {_classroom.teachers ? _classroom.teachers.length : 0 }
      {' '}
      Teachers
    </div>
    <div className="name3">
      {_classroom.members ? _classroom.members.length : 0 }
      {' '}
      Members
    </div>
    <div className="video-count" />
    <div
      className="controls"
      onKeyDown={() => {}}
      role="button"
      tabIndex="-1"
      onClick={(event) => {
        event.stopPropagation();
        PropsopenPopup(() => { PropsdeleteClassroom(_classroom); }, null);
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
    );
  }

  render() {
    return (
      <div>
        {this.renderAdd()}
        {this.renderList()}
      </div>
    );
  }
}

const actions = {
  fetchClassrooms,
  deleteClassroom,
  openPopup,
};


function mapReducerProps({ classroomReducer }) {
  return { classroomReducer };
}

export default connect(mapReducerProps, actions)(ClassRoomList);
