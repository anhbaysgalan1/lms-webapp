import React, { Component } from 'react';
import '../../index.css'
import {ROUTE_ADMIN_USER_DETAIL} from '../../../routes';
import { withRouter } from 'react-router';

class ClassRoom_list_teacher extends Component {
    constructor(props){
        super(props);
        this.state = {
            list_teachers : this.props.list_teachers
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.list_teachers !== this.props.list_teachers){
            this.setState({list_teachers: nextProps.list_teachers})
        }
      }

    userDetail(path){
        this.props.history.push(path)
    }
    renderList(){
        let list_teachers = this.state.list_teachers;
        if (!list_teachers){
            return <div>Loading...</div>
        }

        return (
            <div className="round-panel_cls">Teachers In Class{
            list_teachers.map((member,index)=>{
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
                        this.props.removeData(member);
                    }}>
                    <div className="delete">
                        <i className="text-dark fas fa-trash-alt"></i>
                    </div>
                    </div>
                </div>
                )
            })
        }</div>
        )
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}
  
  
export default withRouter(ClassRoom_list_teacher);