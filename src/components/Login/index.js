import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Form, Input, FormGroup, FormFeedback,
} from 'reactstrap';

import { login } from 'actions/auth';

import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggingIn: false,
      username: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { loggingIn } = this.state;
    const { user, errMsg } = nextProps.authReducer;

    if (!user && errMsg && loggingIn) {
      this.setState({
        loggingIn: false,
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { loginAction } = this.props;

    this.setState({
      loggingIn: true,
    });

    loginAction(username, password);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { username, password, loggingIn } = this.state;
    const { authReducer } = this.props;

    return (
      <div className="login-page">
        <div className="form">
          <h3 className="mb-4">
            LMS Admin
          </h3>
          <Form className="login-form" onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                name="username"
                placeholder="username"
                value={username}
                onChange={this.handleInputChange}
                required
                invalid={authReducer.errMsg !== null}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleInputChange}
                type="password"
                required
                invalid={authReducer.errMsg !== null}
              />
            </FormGroup>
            {
              authReducer.errMsg ? (
                <Input type="hidden" invalid />
              ) : ''
            }
            <FormFeedback className="mb-3">
              { authReducer.errMsg || '' }
            </FormFeedback>
            {
              loggingIn ? (
                <div className="lds-spinner mt-3 mb-3">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              ) : ''
            }
            <FormGroup>
              <Button>
                sign in
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  authReducer: PropTypes.shape({
    user: PropTypes.object,
    errMsg: PropTypes.string,
  }).isRequired,
  loginAction: PropTypes.func.isRequired,
};

function mapReducerProps({ authReducer }) {
  return { authReducer };
}

const actions = {
  loginAction: login,
};

export default connect(mapReducerProps, actions)(Login);
