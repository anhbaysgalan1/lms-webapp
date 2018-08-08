import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';
/* eslint-disable */
import PropTypes from 'prop-types';
/* eslint-enable */
import { fetchUsers, deleteUser } from '../../actions/user';
import { openPopup } from '../../actions/popup';
import { ROUTE_ADMIN_USER_NEW, ROUTE_ADMIN_USER_DETAIL } from '../routes';

import './User.list.css';

class UserList extends Component {
  componentWillMount() {
    const usersReducer = _.get(this.props, 'usersReducer');
    const ActionfetchUsers = _.get(this.props, 'fetchUsers');
    if (!usersReducer) {
      ActionfetchUsers();
    }
  }


  renderUsers() {
    const users = _.get(this.props, 'usersReducer');
    const ActionopenPopup = _.get(this.props, 'openPopup');
    const ActiondeleteUser = _.get(this.props, 'deleteUser');
    const role = ['student', 'teacher'];
    const { history } = this.props;
    if (!users) {
      return (
        <div>
Loading...
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
};

function mapReducerProps({ usersReducer }) {
  return { usersReducer };
}

const actions = {
  fetchUsers,
  deleteUser,
  openPopup,
};

export default connect(mapReducerProps, actions)(UserList);
