import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Form, Label, Input, Button, FormGroup, Container, FormFeedback,
} from 'reactstrap';

import { login } from 'actions/auth';

import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;

    if (value && name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const loginAction = _.get(this.props, 'login');

    loginAction(username, password);
  }

  render() {
    const { username, password } = this.state;
    const errMsg = _.get(this.props, 'authReducer.errMsg');

    return (
      <div className="signin">
        <Container className="text-left">
          <Form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">
              Please sign in to continue!
            </h1>
            <FormGroup>
              <Label for="inputUsername">
                Username
              </Label>
              <Input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
                required
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <Label for="inputPassword">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            {
              errMsg ? <Input type="hidden" invalid /> : ''
            }
            <FormFeedback className="mb-3">
              { errMsg || '' }
            </FormFeedback>
            <div className="checkbox mb-3">
              <Label for="remember" className="checkbox">
                <Input type="checkbox" name="remember" />
                {' '}
                Remember me
              </Label>
            </div>
            <Button size="lg" color="primary" block type="submit">
              Sign in
            </Button>
            <p className="mt-5 mb-3 text-muted text-center">
              &copy; 2018, LMS Webapp.
            </p>
          </Form>
        </Container>
      </div>
    );
  }
}

function mapReducerProps({ authReducer }) {
  return { authReducer };
}

const actions = {
  login,
};

export default connect(mapReducerProps, actions)(Login);
