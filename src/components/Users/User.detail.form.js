import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { validateEmail } from 'utils';

class UserDetailForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    else if (!validateEmail(values.email)) {
      errors.email = "Email is not valid";
    }
    return errors;
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

    const {
      username, email, role
    } = values;

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label> Username </Label>
          <Input
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            invalid={touched.username && !!errors.username}
            value={username}
          />
          <div className="text-danger"> {touched.username ? errors.username : ""} </div>
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type='text'
            name='email'
            value={email}
            onBlur={handleBlur}
            invalid={touched.email && !!errors.email}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.email ? errors.email : ""}</div>
        </FormGroup>

       
        <FormGroup className="d-flex">
          <FormGroup check className="mr-2">
            <Label check>
              <Input type="radio" checked={role === 0} onChange={event => {
                if (event.target.value === "on") {
                  setFieldValue("role", 0);
                }
              }} />{' '}
              Student
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" checked={role === 1} onChange={event => {
                if (event.target.value === "on") {
                  setFieldValue("role", 1);
                }
              }} />{' '}
              Teacher
            </Label>
          </FormGroup>
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button
            onClick={this.props.onCancel}
            className="mx-1"
            color="secondary"> Cancel
          </Button>
          <Button color="primary"> OK </Button>
        </div>
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default UserDetailForm;

