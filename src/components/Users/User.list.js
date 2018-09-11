import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';
import { fetchListUser } from '../../networks/user';
/* eslint-disable */
import PropTypes from 'prop-types';
/* eslint-enable */
import { fetchUsers, deleteUser, fetchUserPagination } from '../../actions/user';
import { openPopup } from '../../actions/popup';
import { ROUTE_ADMIN_USER_NEW, ROUTE_ADMIN_USER_DETAIL } from '../routes';
import { LIMIT } from '../../utils';

import './User.list.css';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      total: null,
    };
    this.numberPage = this.numberPage.bind(this);
  }

  async componentWillMount() {
    const usersReducer = _.get(this.props, 'usersReducer');
    const ActionfetchUsers = _.get(this.props, 'fetchUsers');
    const Total = await fetchListUser();
    this.setState({
      total: Total.data.data.total,
    });
    if (!usersReducer) {
      ActionfetchUsers();
    }
  }

  numberPage(num) {
    const arrNumber = [];
    const { fetchUserPaginationAction } = this.props;
    for (let i = 0; i < num; i += 1) {
      arrNumber.push(i + 1);
    }
    return (
      _.map(arrNumber, el => (
        <li className="page-item">
          <div key={el} className="page-link" onClick={() => fetchUserPaginationAction(el, LIMIT)} onKeyDown={() => {}} tabIndex="-1" role="presentation">
            {el}
          </div>
        </li>
      ))
    );
  }

  pagination() {
    const { total } = this.state;
    const numberPagination = Math.ceil(total / LIMIT);
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
    if (!users) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }
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
                {index + 1}
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
    const { history } = this.props;
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
