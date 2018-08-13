import React, { Component } from 'react';
import { connect } from 'react-redux';

// action
import _ from 'lodash';
import { fetchClassrooms, UpdateClassroom } from '../../actions/classroom';
import { fetchClassroomWithID, fetchPlaylists, fetchClass } from '../../networks/classroom';
import { fetchCourse } from '../../networks/classcourse';
import { fetchListUser } from '../../networks/user';
import ClassroomEditForm from './Classroom.form/Classroom.form.edit';
import {
  removeItem, RemoveDuplicate, allIDinList, JointCourseAndName,
} from '../../utils';


class ClassroomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      dataFetch: null,
      _classSelected: null,
      option_course: null,
      listTeachers: null,
      listTeachersNotInClass: null,
      listTeachersInClass: null,
      listMember: null,
      listMemberInClass: null,
      listMemberNotInClass: null,
      listPlaylist: null,
      listPlaylistInClass: null,
      listPlaylistNotInClass: null,
      listPlayListsContainPlaylist: null,
      isSubmitting: false,
    });
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.clickGetData = this.clickGetData.bind(this);
    this.removeData = this.removeData.bind(this);
    this.clickToUnlock = this.clickToUnlock.bind(this);
  }

  async componentWillMount() {
    try {
      const fetchData = await fetchClass();
      const PropsFetchClassrooms = _.get(this.props, 'fetchClassrooms');
      const idGet = _.get(this.props, 'match.params.id');
      PropsFetchClassrooms();
      const classID = idGet;
      const fetch = await fetchClassroomWithID(classID);
      const option = await fetchCourse();
      const getData = await fetchListUser();
      const getPlaylist = await fetchPlaylists();
      const listPlaylistInClass = [];
      _.map(fetch.playlists, (el) => {
        listPlaylistInClass.push(el.playlist);
      });

      this.setState({
        dataFetch: fetchData.data,
        _classSelected: fetch,
        option_course: option.data,
        listTeachers: getData.data.data,
        listMember: getData.data.data,
        listPlaylist: getPlaylist,
        listPlayListsContainPlaylist: fetch.playlists,
        listPlaylistInClass,
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

      const { listPlaylist } = this.state;
      const listRemoveDuplicatePlaylist = RemoveDuplicate(listPlaylistInClass, listPlaylist);
      const listPlaylistNotInClass = listRemoveDuplicatePlaylist;
      this.setState({
        listTeachersNotInClass,
        listTeachersInClass: fetch.teachers,

        listMemberNotInClass,
        listMemberInClass: fetch.members,

        listPlaylistNotInClass,
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
      listPlayListsContainPlaylist,
    } = this.state;

    const ActionUpdateClassroom = _.get(this.props, 'UpdateClassroom');
    const allIDTeachers = allIDinList(listTeachersInClass);
    const allIDMembers = allIDinList(listMemberInClass);
    // const allIDPlaylists = listPlaylistInClass;
    obj.teachers = allIDTeachers;
    obj.members = allIDMembers;
    obj.playlists = listPlayListsContainPlaylist;
    this.setState({
      isSubmitting: true,
    });
    ActionUpdateClassroom(obj).then(() => {
      this.onCancel();
    });
  }

  clickToUnlock(objPlaylists){
    const {
      listPlayListsContainPlaylist
    } = this.state;
    let flag = objPlaylists.unlock;
    flag = flag ? false : true
    _.map(listPlayListsContainPlaylist,(el)=>{
      if (el._id === objPlaylists._id) {
        el.unlock = flag
      }
    })
    this.setState({
      listPlayListsContainPlaylist: listPlayListsContainPlaylist
    })
    return listPlayListsContainPlaylist
  }

  //choose = 1 => List Teachers - Members
  //choose = 2 => Playlist
  clickGetData(obj,choose) {
    const {
      listTeachersInClass,
      listTeachersNotInClass,
      listMemberInClass,
      listMemberNotInClass,
      listPlayListsContainPlaylist,
      listPlaylistNotInClass
    } = this.state;
    
    if (choose === 1){
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
    else if (choose === 2){
      let data = {
        _id: obj._id,
        unlock: false,
        playlist: obj
      }
      this.setState({
        listPlayListsContainPlaylist: [...listPlayListsContainPlaylist, data],
        listPlaylistNotInClass: removeItem(listPlaylistNotInClass,obj)
      })
    }
    
  }

  //choose = 1 => List Teachers - Members
  //choose = 2 => Playlist
  removeData(obj, choose) {
    const {
      listTeachersInClass,
      listTeachersNotInClass,
      listMemberInClass,
      listMemberNotInClass,
      listPlayListsContainPlaylist,
      listPlaylistNotInClass,
    } = this.state;
    if (choose === 1){
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
    else if (choose === 2){
      this.setState({
        listPlaylistNotInClass: [...listPlaylistNotInClass, obj.playlist],
        listPlayListsContainPlaylist: removeItem(listPlayListsContainPlaylist,obj)
      })
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
      // listPlaylistInClass,
      listPlaylistNotInClass,
      listPlayListsContainPlaylist,
      dataFetch
    } = this.state;
    
    const classSelected = _classSelected;
    const ListCourseAndName = JointCourseAndName(dataFetch);
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

              // listPlaylistInClass={listPlaylistInClass}
              listPlaylistNotInClass={listPlaylistNotInClass}

              clickGetData={this.clickGetData}
              removeData={this.removeData}
              clickToUnlock={this.clickToUnlock}

              listPlayListsContainPlaylist={listPlayListsContainPlaylist}

              ListCourseAndName={ListCourseAndName}

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