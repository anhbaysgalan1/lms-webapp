import React, { Component } from 'react';
import '../../index.css'
import {ROUTE_ADMIN_USER_DETAIL} from '../../../routes';
import { withRouter } from 'react-router';

class ClassRoomlistmembernotin extends Component {
    constructor(props){
        super(props);
        this.state = {
            list_member : this.props.list_member
        }
    }

    userDetail(path){
        this.props.history.push(path)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.list_member !== this.props.list_member){
            this.setState({list_member: nextProps.list_member})
        }
    }

    renderList(){
        let list_member = this.state.list_member;
        if (!list_member){
            return <div>Loading...</div>
        }

        return (
            <div className="round-panel_cls">Members List{
            list_member.map((member,index)=>{
                return(            
                    <div 
                    className="classroom-item"
                    key={member._id}
                    onClick={() => this.userDetail(`${ROUTE_ADMIN_USER_DETAIL}/${member._id}`)}
                    >
                    <div className="no">{ index + 1 }</div>
                    <div className="name">{ member.username }</div>
                    <div className="name2">{member.email}</div>
                    <div className="video-count"></div>
                        <div className="controls" 
                            onClick={(event) => {
                                event.stopPropagation();
                                this.props.clickGetData(member);
                                }}>
                        <div className="delete">
                            <i className=" text-dark fas fa-check"></i>
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
                {/* {this.renderListTeacherExist()} */}
            </div>
        );
    }
}
  
  
export default withRouter(ClassRoomlistmembernotin);