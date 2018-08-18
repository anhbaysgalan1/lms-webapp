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
    this.state = ({
      isSubmitting: false,
    });
  }

  onSubmit(user) {
    const ActionaddUser = _.get(this.props, 'addUser');
    const { history } = this.props;
    this.setState({
      isSubmitting: true,
    });
    ActionaddUser(user).then(() => {
      handleGoBack(history);
    });
  }

  render() {
    const { history } = this.props;
    const { isSubmitting } = this.state;
    return (
      <div>
        {isSubmitting ? (
          <div className="d-flex justify-content-center">
            {/* eslint-disable global-require */}
            <img alt="" src={require('../../statics/loader.gif')} />
            {/* eslint-enable global-require */}
          </div>
        )
          : (
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
          )
        }
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
