import React, { Component } from 'react';
import { Formik } from 'formik';
/* eslint-disable */
import { withRouter } from 'react-router';
/* eslint-enable */
import _ from 'lodash';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import ClassRoomlistteacher from './Classroom.AddTeachers_Members/Classroom.form.list.teachers';
import ClassRoomlistteachernotin from './Classroom.AddTeachers_Members/Classroom.form.list.teachers.not.in';
import ClassRoomlistmember from './Classroom.AddTeachers_Members/Classroom.form.list.member';
import ClassRoomlistmembernotin from './Classroom.AddTeachers_Members/Classroom.form.list.member.not.in';
import ClassRoomPlaylist from './Classroom.Playlists/Classroom.Playlists';
import ClassRoomPlaylistNotIn from './Classroom.Playlists/Classroom.PlaylistsNotIn';


class ClassroomEditForm extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.validate = this.validate.bind(this);
    const PropslistMemberInClass = _.get(this.props, 'listMemberInClass');
    const PropslistMemberNotInClass = _.get(this.props, 'listMemberNotInClass');
    const PropslistTeachersInClass = _.get(this.props, 'listTeachersInClass');
    const PropslistTeachersNotInClass = _.get(this.props, 'listTeachersNotInClass');
    const PropslistPlaylistInClass = _.get(this.props, 'listPlaylistInClass');
    const PropslistPlaylistNotInClass = _.get(this.props, 'listPlaylistNotInClass');
    const PropsListCourseAndName = _.get(this.props, 'ListCourseAndName');
    this.state = {
      show_add: false,
      show_add_mem: false,
      show_add_playlist: false,
      listTeachersNotInClass: PropslistTeachersNotInClass,
      listTeachersInClass: PropslistTeachersInClass,
      listMemberInClass: PropslistMemberInClass,
      listMemberNotInClass: PropslistMemberNotInClass,
      listPlaylistInClass: PropslistPlaylistInClass,
      listPlaylistNotInClass: PropslistPlaylistNotInClass,
      ListCourseAndName: PropsListCourseAndName,
    };
  }

  componentWillReceiveProps(nextProps) {
    const NextPropslistTeachersInClass = _.get(nextProps, 'listTeachersInClass');
    const PropsTeachersInClass = _.get(this.props, 'listTeachersInClass');
    const NextPropslistTeachersNotInClass = _.get(nextProps, 'listTeachersNotInClass');
    const PropsTeachersNotInClass = _.get(this.props, 'listTeachersNotInClass');
    if (NextPropslistTeachersInClass !== PropsTeachersInClass) {
      this.setState({
        listTeachersInClass: NextPropslistTeachersInClass,
      });
    }

    if (NextPropslistTeachersNotInClass !== PropsTeachersNotInClass) {
      this.setState({
        listTeachersNotInClass: NextPropslistTeachersNotInClass,
      });
    }
    const PropsMemberInClass = _.get(this.props, 'listMemberInClass');
    const NextPropslistMemberInClass = _.get(nextProps, 'listMemberInClass');
    const PropsMemberNotInClass = _.get(this.props, 'listMemberNotInClass');
    const NextPropslistMemberNotInClass = _.get(nextProps, 'listMemberNotInClass');

    if (NextPropslistMemberInClass !== PropsMemberInClass) {
      this.setState({
        listMemberInClass: NextPropslistMemberInClass,
      });
    }

    if (NextPropslistMemberNotInClass !== PropsMemberNotInClass) {
      this.setState({
        listMemberNotInClass: NextPropslistMemberNotInClass,
      });
    }

    const NextPropslistPlaylistInClass = _.get(nextProps, 'listPlaylistInClass');
    const PropsPlaylistInClass = _.get(this.props, 'listPlaylistInClass');
    const NextPropslistPlaylistNotInClass = _.get(nextProps, 'listPlaylistNotInClass');
    const PropsPlaylistNotInClass = _.get(this.props, 'listPlaylistNotInClass');
    if (NextPropslistPlaylistInClass !== PropsPlaylistInClass) {
      this.setState({
        listPlaylistInClass: NextPropslistPlaylistInClass,
      });
    }

    if (NextPropslistPlaylistNotInClass !== PropsPlaylistNotInClass) {
      this.setState({
        listPlaylistNotInClass: NextPropslistPlaylistNotInClass,
      });
    }
  }
  /* eslint-disable */
  validate(values) {
    const { ListCourseAndName } = this.state;
    const currentClass = this.props.initialValues.course + this.props.initialValues.classroom;
    const errors = {};
    if (!values.classroom) {
      errors.classroom = 'Name is required!';
    }
    if (values.course === '') {
      errors.course = 'Choose Your Course!';
    }
    if (values.session === ''){
      errors.session = 'Session cant be Blank!'
    }
    _.map(ListCourseAndName,el=>{
      let stringDuplicate = values.course + values.classroom
      if (stringDuplicate !== currentClass && stringDuplicate === el){
        errors.duplicate = 'This class have been existed!';
        errors.flag = true
      }
    })
    return errors;
  }
  /* eslint-enable */

  buttonAdd() {
    const { show_add: ShowAdd } = this.state;
    return (
      <Button
        className="admin-btn mr-2 text-dark"
        onClick={() => {
          if (ShowAdd) {
            this.setState({ show_add: false });
          } else {
            this.setState({ show_add: true });
          }
        }}
      >
        <i className={ShowAdd ? 'fas fa-minus' : 'fas fa-plus mr-1'} />
        {' '}
        {ShowAdd ? 'Close' : 'Add Teachers into Class'}
      </Button>
    );
  }

  buttonAddMem() {
    const { show_add_mem: ShowAddMem } = this.state;
    return (
      <Button
        className="admin-btn mr-2 text-dark"
        onClick={() => {
          if (ShowAddMem) {
            this.setState({ show_add_mem: false });
          } else {
            this.setState({ show_add_mem: true });
          }
        }}
      >
        <i className={ShowAddMem ? 'fas fa-minus' : 'fas fa-plus mr-1'} />
        {' '}
        {ShowAddMem ? 'Close' : 'Add Members into Class'}
      </Button>
    );
  }

  buttonAddPlaylist() {
    const { show_add_playlist: showAddPlaylist } = this.state;
    return (
      <Button
        className="admin-btn mr-2 text-dark"
        onClick={() => {
          if (showAddPlaylist) {
            this.setState({ show_add_playlist: false });
          } else {
            this.setState({ show_add_playlist: true });
          }
        }}
      >
        <i className={showAddPlaylist ? 'fas fa-minus' : 'fas fa-plus mr-1'} />
        {' '}
        {showAddPlaylist ? 'Collapse' : 'Extend' }
      </Button>
    );
  }


  renderOption() {
    const listData = _.get(this.props, 'data_name_course');
    return (
      listData.map(el => (
        <option value={el.course} key={el._id}>
          {el.course}
        </option>))
    );
  }

  renderTeachersNotInClass() {
    const listMemberNotInClass = _.get(this.state, 'listTeachersNotInClass');
    const clickGetData = _.get(this.props, 'clickGetData');
    return (
      <ClassRoomlistteachernotin
        list_teachers={listMemberNotInClass}
        clickGetData={clickGetData}
      />
    );
  }

  renderTeachers() {
    const listTeachersInClass = _.get(this.state, 'listTeachersInClass');
    const removeData = _.get(this.props, 'removeData');
    return (
      <ClassRoomlistteacher
        list_teachers={listTeachersInClass}
        removeData={removeData}
      />
    );
  }

  renderMemberNotInClass() {
    const listMemberNotInClass = _.get(this.state, 'listMemberNotInClass');
    const clickGetData = _.get(this.props, 'clickGetData');
    return (
      <ClassRoomlistmembernotin
        list_member={listMemberNotInClass}
        clickGetData={clickGetData}
      />
    );
  }

  renderMember() {
    const listMemberInClass = _.get(this.state, 'listMemberInClass');
    const removeData = _.get(this.props, 'removeData');
    return (
      <ClassRoomlistmember
        list_member={listMemberInClass}
        removeData={removeData}
      />
    );
  }

  renderPlaylist() {
    const listPlaylist = _.get(this.props, 'listPlayListsContainPlaylist');
    const clickToUnlock = _.get(this.props, 'clickToUnlock');
    const removeData = _.get(this.props, 'removeData');
    return (
      <ClassRoomPlaylist
        list_playlist={listPlaylist}
        clickToUnlock={clickToUnlock}
        removeData={removeData}
      />
    );
  }

  renderPlaylistNotIn() {
    const listPlaylist = _.get(this.state, 'listPlaylistNotInClass');
    const clickGetData = _.get(this.props, 'clickGetData');
    const removeData = _.get(this.props, 'removeData');
    return (
      <ClassRoomPlaylistNotIn
        list_playlist={listPlaylist}
        clickGetData={clickGetData}
        removeData={removeData}
      />
    );
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      // isSubmitting,
    } = formProps;
    const {
      course,
      classroom,
      session,
    } = values;

    const {
      listTeachersInClass,
      listTeachersNotInClass,
      listMemberInClass,
      listMemberNotInClass,
      show_add: showAdd,
      show_add_mem: showAddMem,
      show_add_playlist: showAddPlaylist,
    } = this.state;

    const onCancel = _.get(this.props, 'onCancel');
    if (!listTeachersNotInClass || !listTeachersInClass
        || !listMemberInClass || !listMemberNotInClass) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
Course
          </Label>
          <Input
            type="select"
            name="course"
            value={course}
            onBlur={handleBlur}
            onChange={handleChange}
            invalid={touched.course && !!errors.course}
          >
            <option key="0" value="">
Choose...
            </option>
            {this.renderOption()}
          </Input>
          <div className="text-danger">
            {touched.course ? errors.course : ''}
          </div>
        </FormGroup>


        {/* Class */}
        <FormGroup>
          <Label>
Class
          </Label>
          <Input
            type="number"
            name="classroom"
            onBlur={handleBlur}
            onChange={handleChange}
            value={classroom}
            /* eslint-disable */
            invalid={touched.classroom && !!errors.classroom && errors.flag}
          />
          <div className="text-danger">
            {touched.classroom ? errors.classroom : ''}
            {errors.flag ? errors.duplicate : ''}
          </div>
        </FormGroup>

        {/* Session */}

        <FormGroup>
          <Label>
Session
          </Label>
          <Input
            type="number"
            name="session"
            onBlur={handleBlur}
            onChange={handleChange}
            value={session}
            /* eslint-disable */
            invalid={touched.session && !!errors.session}
          />
          <div className="text-danger">
            {touched.classroom ? errors.session : ''}
          </div>
        </FormGroup>

        {/* Query List Users */}
        <div className="d-flex justify-content-end">
          {this.buttonAdd()}
        </div>
        <div id="listTeachers" className="mb-3">
          {this.renderTeachers()}
        </div>
        <div id="listTeachersNotIn" className="mb-3" style={{ display: showAdd ? 'block' : 'none' }}>
          {this.renderTeachersNotInClass()}
        </div>

        <div className="d-flex justify-content-end">
          {this.buttonAddMem()}
        </div>
        <div className="mb-3">
          {this.renderMember()}
        </div>
        <div className="mb-3" style={{ display: showAddMem ? 'block' : 'none' }}>
          {this.renderMemberNotInClass()}
        </div>
        {/* Render Playlists */}
        <div className="d-flex justify-content-end">
        {this.buttonAddPlaylist()}
        </div>
        <div className="mb-3">
        {this.renderPlaylist()}
        </div>
        <div className="mb-3" style={{ display: showAddPlaylist ? 'block' : 'none' }}>
        {this.renderPlaylistNotIn()}
        </div>
        {/* Button */}
        <div className="d-flex justify-content-end">
        <Button
          className="mx-1"
          onClick={onCancel}
        >
Back
        </Button>

        <Button className="btn btn-info">
Submit
        </Button>
        </div>
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    const initialValues = _.get(this.props, 'initialValues');
    const onSubmit = _.get(this.props, 'onSubmit');
    return (
      <div>
        <Formik
          initialValues={initialValues}
          validate={this.validate}
          onSubmit={onSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }
}

export default withRouter(ClassroomEditForm);
