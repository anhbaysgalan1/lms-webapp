import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, } from 'reactstrap';
import _ from 'lodash';

import { fetchUsers, updateUser ,deleteUser} from "actions/users";
import { openPopup } from 'actions/popup';
import { ROUTE_ADMIN_USER_NEW, ROUTE_ADMIN_USER_DETAIL } from "../routes";

import "./users.list.css";

class UsersList extends Component {
  componentWillMount(){
    if(!this.props.usersReducer) {
      this.props.fetchUsers();
    }
  }

  renderUsers() {
    const users = this.props.usersReducer;
    if(!users) {return <div>Loading...</div>}

    return (
      <div className="round-panel">
        {
          _.values(users).map((users, index) => {
            return (
              <div 
              className="users-item"
              key={index}
              onClick={() => this.props.history.push(`${ROUTE_ADMIN_USER_DETAIL}/${users._id}`)}
              >
              <div className="no">{index + 1}</div>
              <div className="name"> {users.username} </div>
              <div className="name"> {users.email} </div>
              <div className="user-role">{users.role}</div>
              <div className="controls"
                onClick={(event) => {
                  event.stopPropagation();
                  this.props.openPopup(()=>{
                    this.props.deleteUser(users)
                  }, null);
                }}>
              <div className="delete">
                <i className="text-dark fas fa-trash-alt"></i>
              </div>
              </div>
              </div>
            )
          })
        }

      </div>
    ); 
  }



  
  renderControls() {
    return(
      <div className="admin-controls">
        <Button
        className="admin-btn mr-2 text-dark"
        onClick={() => this.props.history.push(ROUTE_ADMIN_USER_NEW)}
        >
          <i className="fas fa-plus mr-1"></i> {'  '} Add User

        </Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderControls()}
        {this.renderUsers()}
      </div>
    );
  }
}

function mapReducerProps({ usersReducer }) {
  return { usersReducer };
}

const actions = {
  fetchUsers,
  deleteUser,
  openPopup
}

export default connect(mapReducerProps, actions)(UsersList);



