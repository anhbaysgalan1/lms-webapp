import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { handleGoBack } from 'utils';
import { addBulkUser } from 'actions/user';
import { fetchClassrooms } from 'actions/classroom';

class UserAddBulk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classroom: null,
      studentData: null,
      isLoading: false,
    };

    this.handlePasteUser = this.handlePasteUser.bind(this);
    this.renderStudentsInfo = this.renderStudentsInfo.bind(this);
    this.renderClassrooms = this.renderClassrooms.bind(this);
    this.handleClassroomChange = this.handleClassroomChange.bind(this);
    this.submitBulkUser = this.submitBulkUser.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
  }

  componentWillMount() {
    const fetchClassroomsAction = _.get(this.props, 'fetchClassrooms');
    fetchClassroomsAction();
  }

  componentWillReceiveProps(nextProps) {
    const classrooms = _.get(nextProps, 'classroomReducer');
    const { classroom } = this.state;

    if (classrooms && Object.keys(classrooms).length > 0 && !classroom) {
      this.setState({ classroom: Object.keys(classrooms)[0] });
    }
  }

  handlePasteUser(e) {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    let studentData = pastedData.split('\n').map(student => student.split('\t'));
    studentData = studentData.map((student) => {
      const temp = student;
      temp[2] = temp[2] && Number(temp[2][0]) !== 0 ? `0${temp[2]}` : temp[2];
      return temp;
    });
    this.setState({ studentData });
  }

  handleClassroomChange(e) {
    this.setState({ classroom: e.target.value });
  }

  submitBulkUser() {
    const addBulkUserAction = _.get(this.props, 'addBulkUser');
    const { history } = this.props;
    const { classroom, studentData } = this.state;

    this.setState({ isLoading: true });

    addBulkUserAction(classroom, studentData)
      .then((response) => {
        if (_.get(response, 'payload.data.success')) {
          handleGoBack(history);
        }
      });
  }

  removeStudent(studentEmail) {
    let { studentData } = this.state;
    studentData = studentData.filter(student => student[1] !== studentEmail);
    this.setState({ studentData });
  }

  renderStudentsInfo() {
    const { studentData } = this.state;

    if (!studentData) {
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
        <div
          className="student-header student-item"
          role="presentation"
        >
          <div className="no">
            #
          </div>
          <div className="name">
            {' '}
            Họ tên
            {' '}
          </div>
          <div className="email">
            {' '}
            Email
            {' '}
          </div>
          <div className="phone">
            {' '}
            Số điện thoại
            {' '}
          </div>
          <div className="dob">
            {' '}
            Ngày sinh
            {' '}
          </div>
          <div className="facebook">
            {' '}
            Facebook
            {' '}
          </div>
          <div
            className="controls"
          >
            <div className="delete">
              <i className="text-dark fas fa-trash-alt" />
            </div>
          </div>
        </div>
        {
          studentData.map((student, index) => (
            <div
              className="student-item"
              key={student[2]}
              role="presentation"
            >
              <div className="no">
                {index + 1}
              </div>
              <div className="name">
                {' '}
                {student[0]}
                {' '}
              </div>
              <div className="email">
                {' '}
                {student[1]}
                {' '}
              </div>
              <div className="phone">
                {' '}
                {student[2]}
                {' '}
              </div>
              <div className="dob">
                {' '}
                {student[3]}
                {' '}
              </div>
              <div className="facebook">
                {' '}
                <a target="_blank" rel="noopener noreferrer" href={student[4]}>
                  Xem
                </a>
                {' '}
              </div>
              <div
                className="controls"
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  this.removeStudent(student[1]);
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

  renderClassrooms() {
    const classrooms = _.get(this.props, 'classroomReducer');

    if (classrooms) {
      return _.map(classrooms, classroom => (
        <option key={classroom._id} value={classroom._id}>
          {classroom.course}
          {' '}
          {classroom.classroom}
        </option>
      ));
    } return '';
  }

  render() {
    const { studentData, isLoading } = this.state;
    const { history } = this.props;
    console.log(_.get(this.props, 'classroomReducer'))

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }

    return (
      <div>
        <div className="paste_holder" onPaste={this.handlePasteUser}>
          Click here and paste Student infomation!
        </div>
        { studentData && studentData.length > 0 ? (
          <div>
            <Form inline>
              <FormGroup className="classroom-select">
                <Label for="classroomSelect">
                  Classroom:
                </Label>
                <Input type="select" name="classroomSelect" id="classroomSelect" onChange={this.handleClassroomChange}>
                  {this.renderClassrooms()}
                </Input>
              </FormGroup>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => { handleGoBack(history); }}
                  className="mx-1"
                  color="secondary"
                >
                  {' '}
                  Cancel
                </Button>
                <Button
                  onClick={this.submitBulkUser}
                  color="primary"
                >
                  {' '}
                  OK
                  {' '}
                </Button>
              </div>
            </Form>
            {this.renderStudentsInfo()}
          </div>
        ) : '' }
      </div>
    );
  }
}

UserAddBulk.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
  }).isRequired,
};

function mapReducerProps({ classroomReducer }) {
  return { classroomReducer };
}

const actions = {
  fetchClassrooms,
  addBulkUser,
};

export default connect(mapReducerProps, actions)(UserAddBulk);
