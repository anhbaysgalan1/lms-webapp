import React, {Component} from 'react';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

//action
import {fetchClassrooms,deleteClassroom} from '../../actions/classroom';
//route_path
import {ROUTE_ADMIN_CLASSROOM,ROUTE_ADMIN_CLASSROOM_NEW, ROUTE_ADMIN_CLASSROOM_DETAIL, ROUTE_ADMIN_CLASSROOM_DETAIL_ID} from '../routes';

import { openPopup } from '../../actions/popup';
import './index.css'

class ClassRoomList extends Component{
    componentWillMount(){
        if (!this.props.classroomReducer){
            this.props.fetchClassrooms();
        }
    }
    renderAdd(){
        return (
        <div className="admin-controls">
            <Button
              className="admin-btn mr-2 text-dark"
              onClick={() => this.props.history.push(ROUTE_ADMIN_CLASSROOM_NEW)}
            >
              <i className="fas fa-plus mr-1"></i> {'  '} Add Class
            </Button>
        </div>
        );
    }

    renderList(){
        const list_ClassRoom = this.props.classroomReducer;
        if (!list_ClassRoom){
            return <div>Loading...</div>
        }
        return(<div className="round-panel_cls">
        {
          _.values(list_ClassRoom).map((_classroom, index) => {
            return (
              <div 
                className="classroom-item"
                key={_classroom._id}
                onClick={() => this.props.history.push(`${ROUTE_ADMIN_CLASSROOM_DETAIL}/${_classroom._id}`)}
              >
                <div className="no">{ index + 1 }</div>
                <div className="name">{ _classroom.name }{_classroom.course}</div>
                {/* <div className="name2">{_classroom.teachers.length} Teachers</div> */}
                <div className="video-count"></div>
                <div className="controls" 
                    onClick={(event) => {
                    event.stopPropagation();
                    this.props.openPopup(()=>{this.props.deleteClassroom(_classroom)},null);
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
    
    render(){
        return (
            <div>
                {this.renderAdd()}
                {this.renderList()}
            </div>
        );
             
    }
}

function mapReducerProps({classroomReducer}){
    return {classroomReducer};
}

const actions = {
    fetchClassrooms,
    deleteClassroom,
    openPopup,
}

export default connect(mapReducerProps,actions)(ClassRoomList);