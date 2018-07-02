import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from 'actions/user';
import UserForm from './User.form';
  
  
class UserNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    return (
      <div>
        <UserForm 
          initialValues={{
            username: "",
            email: "",
            role: "student"
          }}
          onSubmit={this.onSubmit} 
          onCancel={this.props.history.goBack}
        />
      </div>
    );
  }

  onSubmit(user) {
    this.props.addUser(user);
    this.props.history.goBack();
  }

}

  
  
export default connect(null, { addUser })(UserNew);



