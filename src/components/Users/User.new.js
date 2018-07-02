import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, fetchUsers } from 'actions/user';
import UserForm from './User.form';
import _ from 'lodash';

  
  
class UserNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    if (!this.props.usersReducer) {
      this.props.fetchUsers();
    }
  }

  render() {
    const user = this.props.usersReducer;
    const user_list = _.map(user)
    const _id = user_list.length+1;
    
    
    return (
      <div>
        <UserForm 
          initialValues={{
            username: "",
            email: "",
            password: "",
            role: "student",
            _id: _id
          }}
          onSubmit={this.onSubmit} 
          onCancel={this.props.history.goBack}
        />
      </div>
    );
  }

  onSubmit(user) {
    console.log(user);
    
    this.props.addUser(user);
    this.props.history.goBack();
  }

}

function mapConnectToReducer({usersReducer}) {
  return {usersReducer}
}
  
export default connect(mapConnectToReducer, { addUser, fetchUsers })(UserNew);



