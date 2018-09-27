import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';
// import { fetchListUser } from 'networks/user';
/* eslint-disable */
import PropTypes from 'prop-types';
/* eslint-enable */
import { fetchUsers, deleteUser, fetchUserPagination } from 'actions/user';
import { openPopup } from 'actions/popup';
import { LIMIT_USER, SeparatePage } from 'utils';
import SearchBar from 'components/SearchBar';
import {
  ROUTE_ADMIN_USER_NEW,
  ROUTE_ADMIN_ADD_BULK_USER,
  ROUTE_ADMIN_USER_DETAIL,
  ROUTE_ADMIN_USER,
} from '../routes';

import './User.list.css';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      total: null,
      defaultDisable: true,
      getParams: null,
      keyword: '',
    };
    this.numberPage = this.numberPage.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  async componentWillMount() {
    const usersReducer = _.get(this.props, 'usersReducer');
    const { location, fetchUserPaginationAction } = this.props;
    const { keyword } = this.state;
    const getParams = new URLSearchParams(location.search).get('page');
    const Total = await fetchUserPaginationAction(1, LIMIT_USER, keyword);
    this.setState({
      total: Total.payload.data.data.total,
      active: null,
      getParams,
    });

    if (!usersReducer) {
      if (getParams === null) {
        fetchUserPaginationAction(1, LIMIT_USER, keyword);
        this.setState({
          defaultDisable: true,
        });
      } else {
        fetchUserPaginationAction(getParams, LIMIT_USER, keyword);
      }
      // ActionfetchUsers();
    }
    if (getParams === null) {
      fetchUserPaginationAction(1, LIMIT_USER, keyword);
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
    const {
      active, defaultDisable, getParams, keyword,
    } = this.state;
    const { fetchUserPaginationAction, history } = this.props;
    for (let i = 0; i < num; i += 1) {
      arrNumber.push(i + 1);
    }
    return (
      _.map(arrNumber, (el, index) => (
        <li className={(active === index) || (parseInt(getParams, 10) === index + 1) || (defaultDisable && getParams === null && index === 0) ? 'page-item disabled' : 'page-item'} key={index}>
          <div className="page-link" onClick={() => { history.push(`${ROUTE_ADMIN_USER}?page=${el || 1}`); fetchUserPaginationAction(el, LIMIT_USER, keyword); this.toggleActive(index); }} onKeyDown={() => {}} tabIndex="-1" role="presentation">
            {el}
          </div>
        </li>
      ))
    );
  }

  pagination() {
    const { total } = this.state;
    const numberPagination = SeparatePage(total, LIMIT_USER);
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

  renderUsers() {
    const users = _.get(this.props, 'usersReducer');
    const ActionopenPopup = _.get(this.props, 'openPopup');
    const ActiondeleteUser = _.get(this.props, 'deleteUser');
    const role = ['student', 'teacher'];
    const { history } = this.props;
    const { total, getParams} = this.state;
    if (!users || !total) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }
    const intParams = parseInt(getParams, 10);
    const count = intParams - 1 || 0;
    return (
      <div className="round-panel">
        {
          _.values(users).map((userS, index) => (
            <div
              className="users-item"
              key={userS._id}
              role="presentation"
              onClick={() => history.push(`${ROUTE_ADMIN_USER_DETAIL}/${userS._id}`)}
            >
              <div className="no">
                { count * 30 + (index + 1)}
              </div>
              <div className="name">
                {' '}
                {userS.username}
                {' '}
              </div>
              <div className="name">
                {' '}
                {userS.email}
                {' '}
              </div>
              <div className="user-role">
                {role[userS.role]}
              </div>
              <div
                className="controls"
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  ActionopenPopup(() => {
                    ActiondeleteUser(userS._id);
                  }, null);
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

    );
  }

  renderControls() {
    const { history, fetchUserPaginationAction } = this.props;
    return (
      <div className="admin-controls">
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => history.push(ROUTE_ADMIN_USER_NEW)}
        >
          <i className="fas fa-plus mr-1" />
          {' '}
          {'  '}
          {' '}
          Add User
        </Button>
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => history.push(ROUTE_ADMIN_ADD_BULK_USER)}
        >
          <i className="fas fa-plus mr-1" />
          {' '}
          {'  '}
          {' '}
          Add Bulk User
        </Button>
        <div className="mr-auto d-inline-flex align-items-center">
          <span className="mr-2">
          Search:
          </span>
          <SearchBar onSearch={(keyword) => {
            this.setState({ keyword });
            fetchUserPaginationAction(1, LIMIT_USER, keyword)
              .then((data) => {
                const userData = data.payload.data.data;
                history.push(`${ROUTE_ADMIN_USER}?page=1`);
                this.setState({
                  total: userData.total,
                  active: null,
                  getParams: 1,
                });
              });
          }}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderControls()}
        {this.renderUsers()}
      </div>
    );
  }
}

UserList.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
  }).isRequired,
  fetchUserPaginationAction: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};

function mapReducerProps({ usersReducer }) {
  return { usersReducer };
}

const actions = {
  fetchUsers,
  deleteUser,
  openPopup,
  fetchUserPaginationAction: fetchUserPagination,
};

export default connect(mapReducerProps, actions)(UserList);
