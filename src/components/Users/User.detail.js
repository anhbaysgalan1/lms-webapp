import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserById } from "../../networks/user";
import { updateUser } from "actions/user";
import UserDetailForm from './User.detail.form';
  
  
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const user = this.props.match.params.id;
    fetchUserById(user).then((user) => {
      
      this.setState({
        user
      });
    })
  }

  onSubmit(user) {
    this.props.updateUser(user).then(() => {
      this.props.history.goBack();
    });
  }

  render() {
    if(!this.state.user) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <div>
          <UserDetailForm 
          initialValues={this.state.user.data.data}
          onSubmit={this.onSubmit}
          onCacel={this.props.history.goback}
          />
        </div>
      </div>
    );
  }
}
  
  
export default connect(null, { updateUser })(UserDetail);
