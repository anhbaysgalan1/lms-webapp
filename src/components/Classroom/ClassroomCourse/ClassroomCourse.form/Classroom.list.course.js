import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FetchCourseAction, DeleteCourseAction } from '../../../../actions/classcourse';
import { openPopup } from '../../../../actions/popup';
import '../../index.css';

class ClassroomListCourse extends Component {
  componentWillMount() {
    const classcourseReducer = _.get(this.props, 'classcourseReducer');
    const PropsFetchCourseAction = _.get(this.props, 'FetchCourseAction');
    if (!classcourseReducer) {
      PropsFetchCourseAction();
    }
  }

  render() {
    const listCourse = _.get(this.props, 'classcourseReducer');
    const ActionPopup = _.get(this.props, 'openPopup');
    const ActionDeleteCourse = _.get(this.props, 'DeleteCourseAction');
    const PropsHistory = _.get(this.props, 'PropsHistory');
    return (
      <div className="round-panel_cls mt-4">
        {
       _.values(listCourse).map((course, index) => (
         <div
           className="classroom-item"
           role="button"
           tabIndex="-1"
           key={course._id}
           onClick={() => { PropsHistory.push(`course/detail/${course._id}`); }}
           onKeyPress={() => {}}
         >
           <div className="no">
             { index + 1 }
           </div>
           <div className="name">
             { course.course }
             {/* eslint-disable */}
             { course.classroom }
           </div>
           <div className="name2">{ course.session }</div>
           {/* <div className="name2">{course.teachers.length} Teachers</div> */}
           <div className="video-count" />
           <div
             className="controls"
             onKeyDown={() => {}}
             tabIndex="-1"
             role="button"
             onClick={(event) => {
               event.stopPropagation();
               ActionPopup(() => { ActionDeleteCourse(course); }, null);
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
}

function mapReducerProps({ classcourseReducer }) {
  return { classcourseReducer };
}

const actions = {
  FetchCourseAction,
  DeleteCourseAction,
  openPopup,
};

export default connect(mapReducerProps, actions)(ClassroomListCourse);
