import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

// action
import { fetchClassrooms, deleteClassroom, fetchClassroomPagination } from '../../actions/classroom';
// route_path
import { ROUTE_ADMIN_CLASSROOM_NEW, ROUTE_ADMIN_CLASSROOM_DETAIL, ROUTE_ADMIN_CLASSROOM } from '../routes';
import { fetchClass } from '../../networks/classroom';
import { openPopup } from '../../actions/popup';
import './index.css';
import { LIMIT_CLASSROOM, SeparatePage } from '../../utils';


class ClassRoomList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      active: null,
      defaultDisable: true,
      total: null,
      getParams: null,
    };
  }

  async componentWillMount() {
    const { fetchClassroomPaginationAction, classroomReducer } = this.props;
    const { location } = this.props;
    const getParams = new URLSearchParams(location.search).get('page');
    const Total = await fetchClass();
    this.setState({
      total: Total.data.total,
      active: null,
      getParams,
    });

    if (!classroomReducer) {
      if (getParams === null) {
        fetchClassroomPaginationAction(1, LIMIT_CLASSROOM);
        this.setState({
          defaultDisable: true,
        });
      } else {
        fetchClassroomPaginationAction(getParams, LIMIT_CLASSROOM);
      }
    }
    if (getParams === null) {
      fetchClassroomPaginationAction(1, LIMIT_CLASSROOM);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (nextProps.location.search !== location.search) {
      const getParams = new URLSearchParams(nextProps.location.search).get('page');
      this.setState({
        getParams,
      });
    }
  }

  toggleActive(index) {
    this.setState({
      active: index,
      defaultDisable: false,
    });
  }

  numberPage(num) {
    const arrNumber = [];
    const { active, defaultDisable, getParams } = this.state;
    const { fetchClassroomPaginationAction, history } = this.props;
    for (let i = 0; i < num; i += 1) {
      arrNumber.push(i + 1);
    }
    return (
      _.map(arrNumber, (el, index) => (
        <li className={(active === index) || (parseInt(getParams, 10) === index + 1) || (defaultDisable && getParams === null && index === 0) ? 'page-item disabled' : 'page-item'} key={index}>
          <div className="page-link" onClick={() => { history.push(`${ROUTE_ADMIN_CLASSROOM}?page=${el}`); fetchClassroomPaginationAction(el, LIMIT_CLASSROOM); this.toggleActive(index); }} onKeyDown={() => {}} tabIndex="-1" role="presentation">
            {el}
          </div>
        </li>
      ))
    );
  }

  pagination() {
    const { total } = this.state;
    const numberPagination = SeparatePage(total, LIMIT_CLASSROOM);
    return (
      <div className="d-flex justify-content-end mt-3">
        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            {this.numberPage(numberPagination)}
          </ul>
        </nav>
      </div>
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
          {this.pagination()}
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

ClassRoomList.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  fetchClassroomPaginationAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
  }).isRequired,
}

const actions = {
  fetchClassrooms,
  deleteClassroom,
  openPopup,
  fetchClassroomPaginationAction: fetchClassroomPagination,
};


function mapReducerProps({ classroomReducer }) {
  return { classroomReducer };
}

export default connect(mapReducerProps, actions)(ClassRoomList);
