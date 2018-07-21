import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FetchCourseAction, DeleteCourseAction} from '../../../actions/classcourse';
import _ from 'lodash';
import { openPopup } from '../../../actions/popup';
import '../index.css'
  
class ClassroomListCourse extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){
    if (!this.props.classcourseReducer){
      this.props.FetchCourseAction()
    }
  }

  render() {
    const list_course = this.props.classcourseReducer;
    return (<div className="round-panel_cls mt-4">
    {
      _.values(list_course).map((course, index) => {
        return (
          <div 
            className="classroom-item"
            key={course._id}
          >
            <div className="no">{ index + 1 }</div>
            <div className="name">{ course.course }{course._class}</div>
            {/* <div className="name2">{course.teachers.length} Teachers</div> */}
            <div className="video-count"></div>
            <div className="controls" 
                onClick={(event) => {
                event.stopPropagation();
                this.props.openPopup(()=>{this.props.DeleteCourseAction(course)},null);
            }}>
              <div className="delete">
                <i className="text-dark fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        );
      })
    }
  </div>);
  }
}

function mapReducerProps({classcourseReducer}){
  return {classcourseReducer};
}

const actions = {
  FetchCourseAction,
  DeleteCourseAction,
  openPopup
}
 
export default connect(mapReducerProps,actions)(ClassroomListCourse);