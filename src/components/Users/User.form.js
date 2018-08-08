import React, { Component } from 'react';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
/* eslint-disable */
import PropTypes from 'prop-types';
/* eslint-enable */
import { validateEmail } from '../../utils';

class UserForm extends Component {
  static validate(values) {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Email is not valid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  }

  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
  }


  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
    } = formProps;

    const { onCancel } = this.props;
    const {
      username, email, password, role,
    } = values;

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            {' '}
Username
            {' '}
          </Label>
          <Input
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            invalid={touched.username && !!errors.username}
            value={username}
          />
          <div className="text-danger">
            {' '}
            {touched.username ? errors.username : ''}
            {' '}
          </div>
        </FormGroup>
        <FormGroup>
          <Label>
Email
          </Label>
          <Input
            type="text"
            name="email"
            value={email}
            onBlur={handleBlur}
            invalid={touched.email && !!errors.email}
            onChange={handleChange}
          />
          <div className="text-danger">
            {touched.email ? errors.email : ''}
          </div>
        </FormGroup>

        <FormGroup>
          <Label>
Password
          </Label>
          <Input
            type="password"
            name="password"
            value={password}
            onBlur={handleBlur}
            invalid={touched.password && !!errors.password}
            onChange={handleChange}
          />
          <div className="text-danger">
            {touched.password ? errors.password : ''}
          </div>
        </FormGroup>

        <FormGroup className="d-flex">
          <FormGroup check className="mr-2">
            <Label check>
              <Input
                type="radio"
                checked={role === 0}
                onChange={(event) => {
                  if (event.target.value === 'on') {
                    setFieldValue('role', 0);
                  }
                }}
              />
              {' '}
              Student
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                checked={role === 1}
                onChange={(event) => {
                  if (event.target.value === 'on') {
                    setFieldValue('role', 1);
                  }
                }}
              />
              {' '}
              Teacher
            </Label>
          </FormGroup>
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button
            onClick={onCancel}
            className="mx-1"
            color="secondary"
          >
            {' '}
Cancel
          </Button>
          <Button color="primary">
            {' '}
OK
            {' '}
          </Button>
        </div>
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    const { initialValues, onSubmit } = this.props;
    return (
      <Formik
        initialValues={initialValues}
        validate={this.validate}
        onSubmit={onSubmit}
        render={this.renderForm}
      />
    );
  }
}
UserForm.defaultProps = {
  initialValues: null,
  onCancel: null,
  onSubmit: null,
};

UserForm.propTypes = {
  initialValues: PropTypes.shape({
    username: PropTypes.string,
    role: PropTypes.number,
  }),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default UserForm;
