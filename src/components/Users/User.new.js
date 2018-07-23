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
            password: "",
            role: 0
          }}
          onSubmit={this.onSubmit} 
          onCancel={this.props.history.goBack}
        />
      </div>
    );
  }

  onSubmit(user) {
    this.props.addUser(user).then(() => {
    this.props.history.goBack();
    });
  }

}

  
  
export default connect(null, { addUser })(UserNew);



