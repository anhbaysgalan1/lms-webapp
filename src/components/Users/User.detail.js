import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { handleGoBack } from 'utils';

import { fetchUsers, updateUser } from '../../actions/user';
import { fetchUserById } from '../../networks/user';
import UserDetailForm from './User.detail.form';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const useR = match.params.id;
    fetchUserById(useR).then((user) => {
      this.setState({
        user,
      });
    });
  }

  onSubmit(user) {
    const { history } = this.props;
    const ActionUpdateUser = _.get(this.props, 'updateUser');
    const ActionfetchUsers = _.get(this.props, 'fetchUsers');
    ActionUpdateUser(user).then(() => {
      ActionfetchUsers();
      handleGoBack(history);
    });
  }

  render() {
    const { user } = this.state;
    const { history } = this.props;
    if (!user) {
      return (
        <div>
Loading...
        </div>
      );
    }
    return (
      <div>
        <div>
          <UserDetailForm
            initialValues={user.data.data}
            onSubmit={this.onSubmit}
            onCancel={() => { handleGoBack(history); }}
          />
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};


export default connect(null, { updateUser, fetchUsers })(UserDetail);
