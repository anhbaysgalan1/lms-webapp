import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

// action
import { fetchClassrooms, deleteClassroom } from '../../actions/classroom';
// route_path
import { ROUTE_ADMIN_CLASSROOM_NEW, ROUTE_ADMIN_CLASSROOM_DETAIL } from '../routes';

import { openPopup } from '../../actions/popup';
import './index.css';


class ClassRoomList extends Component {
  componentWillMount() {
    const PropsFetchClassrooms = _.get(this.props, 'fetchClassrooms');
    PropsFetchClassrooms();
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
        {/* {this.renderAddCourse()} */}

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
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }

    return (
      <div>
        {this.renderAdd()}
        <div className="round-panel">
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
                  { _classroom.classroom }
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
                <div className="name3">
                  {_classroom.playlists.length > 1 ? `${_classroom.playlists.length} Playlists` : `${_classroom.playlists.length} Playlist` }
                  {' '}
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
      </div>
    );
  }

  render() {
    return (
      <div>
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
