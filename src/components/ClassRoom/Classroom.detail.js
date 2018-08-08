import React, { Component } from 'react';
import { connect } from 'react-redux';

// action
import _ from 'lodash';
import { fetchClassrooms, UpdateClassroom } from '../../actions/classroom';
import { fetchClassroomWithID, fetchPlaylists } from '../../networks/classroom';
import { fetchCourse } from '../../networks/classcourse';
import { fetchListUser } from '../../networks/user';
import ClassroomEditForm from './Classroom.form/Classroom.form.edit';
import {
  removeItem, RemoveDuplicate, allIDinList,
} from '../../utils';



class ClassroomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      _classSelected: null,
      option_course: null,
      listTeachers: null,
      listTeachersNotInClass: null,
      listTeachersInClass: null,
      listMember: null,
      listMemberInClass: null,
      listMemberNotInClass: null,
      isSubmitting: false,
    });
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.clickGetData = this.clickGetData.bind(this);
    this.removeData = this.removeData.bind(this);
  }

  async componentWillMount() {
    try {
      const PropsFetchClassrooms = _.get(this.props, 'fetchClassrooms');
      const idGet = _.get(this.props, 'match.params.id');
      PropsFetchClassrooms();
      const classID = idGet;
      const fetch = await fetchClassroomWithID(classID);
      const option = await fetchCourse();
      const getData = await fetchListUser();
      this.setState({
        _classSelected: fetch,
        option_course: option.data,
        listTeachers: getData.data.data,
        listMember: getData.data.data,
      });

      const classSelectedTeachers = _.get(this.state, '_classSelected.teachers');
      const classListTeachers = _.get(this.state, 'listTeachers');
      const classSelectedMembers = _.get(this.state, '_classSelected.members');
      const classListMembers = _.get(this.state, 'listMember');
      const listRemoveDuplicateteachers = RemoveDuplicate(classSelectedTeachers, classListTeachers);
      const listRemoveDuplicateMem = RemoveDuplicate(classSelectedMembers, classListMembers);
      const listTeachersNotInClass = [];
      const listMemberNotInClass = [];
      _.map(listRemoveDuplicateteachers, (el) => {
        if (el.role === 1) {
          listTeachersNotInClass.push(el);
        }
      });
      _.map(listRemoveDuplicateMem, (el) => {
        if (el.role === 0) {
          listMemberNotInClass.push(el);
        }
      });
      this.setState({
        listTeachersNotInClass,
        listTeachersInClass: fetch.teachers,

        listMemberNotInClass,
        listMemberInClass: fetch.members,
      });
    } catch (error) {
      /* eslint-disable */
      console.log(error);
    }
  }

  onCancel() {
    const History = _.get(this.props, 'history');
    History.goBack();
  }

  onSubmit(objClass) {
    const obj = objClass;
    const {
      listTeachersInClass,
      listMemberInClass,
    } = this.state;
    const ActionUpdateClassroom = _.get(this.props, 'UpdateClassroom');
    const allIDTeachers = allIDinList(listTeachersInClass);
    const allIDMembers = allIDinList(listMemberInClass);
    obj.teachers = allIDTeachers;
    obj.members = allIDMembers;
    this.setState({
      isSubmitting: true,
    });
    ActionUpdateClassroom(obj).then(() => {
      this.onCancel();
    });
  }


  clickGetData(obj) {
    const {
      listTeachersInClass,
      listTeachersNotInClass,
      listMemberInClass,
      listMemberNotInClass,
    } = this.state;
    if (obj.role === 1) {
      this.setState({
        listTeachersInClass: [...listTeachersInClass, obj],
        listTeachersNotInClass: removeItem(listTeachersNotInClass, obj),
      });
    } else if (obj.role === 0) {
      this.setState({
        listMemberInClass: [...listMemberInClass, obj],
        listMemberNotInClass: removeItem(listMemberNotInClass, obj),
      });
    }
  }

  removeData(obj) {
    const {
      listTeachersInClass,
      listTeachersNotInClass,
      listMemberInClass,
      listMemberNotInClass,
    } = this.state;
    if (obj.role === 1) {
      this.setState({
        listTeachersNotInClass: [...listTeachersNotInClass, obj],
        listTeachersInClass: removeItem(listTeachersInClass, obj),
      });
    } else if (obj.role === 0) {
      this.setState({
        listMemberNotInClass: [...listMemberNotInClass, obj],
        listMemberInClass: removeItem(listMemberInClass, obj),
      });
    }
  }


  render() {
    const {
      _classSelected,
      option_course: optionCourse,
      isSubmitting,
      listTeachersNotInClass,
      listTeachersInClass,
      listMemberInClass,
      listMemberNotInClass,

    } = this.state;
    console.log(this.props);
    
    const classSelected = _classSelected;
    if (!classSelected) {
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
        {isSubmitting
          ? (
            <div className="d-flex justify-content-center">
            {/* eslint-disable global-require */}
            <img alt="" src={require('../../statics/loader.gif')} />
            {/* eslint-enable global-require */}
            </div>
          )

          : (
            <ClassroomEditForm
              initialValues={classSelected}
              data_name_course={optionCourse}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}

              listTeachersInClass={listTeachersInClass}
              listTeachersNotInClass={listTeachersNotInClass}

              listMemberInClass={listMemberInClass}
              listMemberNotInClass={listMemberNotInClass}

              clickGetData={this.clickGetData}
              removeData={this.removeData}
            />
          )}
      </div>
    );
  }
}

// ________________________________________
function MapsReducer({ classroomReducer }) {
  return { classroomReducer };
}

const actions = {
  fetchClassrooms,
  UpdateClassroom,
};


export default connect(MapsReducer, actions)(ClassroomDetail);
