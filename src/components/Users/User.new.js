import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleGoBack } from 'utils';

import { addUser } from '../../actions/user';
import UserForm from './User.form';

class UserNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(user) {
    const ActionaddUser = _.get(this.props, 'addUser');
    const { history } = this.props;
    ActionaddUser(user).then(() => {
      handleGoBack(history);
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <UserForm
          initialValues={{
            username: '',
            email: '',
            password: '',
            role: 0,
            firstName: '',
            lastName: '',
            linkFB: '',
            phoneNumber: '',
          }}
          onSubmit={this.onSubmit}
          onCancel={() => { handleGoBack(history); }}
        />
      </div>
    );
  }
}

UserNew.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
  }).isRequired,
};

export default connect(null, { addUser })(UserNew);
