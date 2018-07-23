import React, { Component } from 'react';
import '../index.css'
import {ROUTE_ADMIN_USER_DETAIL,ROUTE_ADMIN_CLASSROOM_NEW_COURSE} from '../../routes';
import { withRouter } from 'react-router';

class ClassRoom_list_teacher extends Component {
    constructor(props) {
        super(props);
      }

    userDetail(path){
        this.props.history.push(path)
    }

    renderListTeacherExist(){
        let list_teachers_exist = this.props.list_teachers_exist;
        if (!list_teachers_exist){
            return <div>Loading...</div>
        }

        return (
            <div className="round-panel_cls">Teachers Exist In Class{
                list_teachers_exist.map((member,index)=>{
                if (member.role === "teacher"){
                    return(            
                        <div 
                        className="classroom-item"
                        key={member._id}
                        onClick={()=>{ this.userDetail(`${ROUTE_ADMIN_USER_DETAIL}/${member._id}`)}}
                        >
                        <div className="no">{ index + 1 }</div>
                        <div className="name">{ member.username }</div>
                        <div className="name2">{member.email}</div>
                        <div className="video-count"></div>
                        <div className="controls" 
                            onClick={(event) => {
                            event.stopPropagation();
                            this.props.openPopup(()=>{this.props.deleteClassroom(member)},null);
                        }}>
                        <div className="delete">
                            <i className="text-dark fas fa-trash-alt"></i>
                        </div>
                        </div>
                    </div>
                    )
                } 
            })
        }</div>
        )

    }  


    renderList(){
        let list_teachers = this.props.list_teachers;
        if (!list_teachers){
            return <div>Loading...</div>
        }

        return (
            <div className="round-panel_cls">Add Teachers{
            list_teachers.map((member,index)=>{
                if (member.role === "teacher"){
                    return(            
                        <div 
                        className="classroom-item"
                        key={member._id}
                        onClick={() => this.props.history.push( this.userDetail(`${ROUTE_ADMIN_USER_DETAIL}/${member._id}`) )}
                        >
                        <div className="no">{ index + 1 }</div>
                        <div className="name">{ member.username }</div>
                        <div className="name2">{member.email}</div>
                        <div className="video-count"></div>
                        <div className="controls" 
                            onClick={(event) => {
                            event.stopPropagation();
                            this.props.openPopup(()=>{this.props.deleteClassroom(member)},null);
                        }}>
                        <div className="delete">
                            <i className="text-dark fas fa-trash-alt"></i>
                        </div>
                        </div>
                    </div>
                    )
                } 
            })
        }</div>
        )
    }

    render() {
        return (
            <div>
                {this.renderList()}
                {this.renderListTeacherExist()}
            </div>
        );
    }
}
  
  
export default withRouter(ClassRoom_list_teacher);