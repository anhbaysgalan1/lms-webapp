import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import UserList from "./User.list"
import UserNew from "./User.new"
import UserDetail from "./User.detail"

import { ROUTE_ADMIN_USER_NEW, ROUTE_ADMIN_USER_DETAIL_ID } from '../routes';

class User extends Component {
  render() {
    return (
      <div className="h-100">
        <Switch>
          <Route path={ROUTE_ADMIN_USER_DETAIL_ID} component={UserDetail} />
          <Route path={ROUTE_ADMIN_USER_NEW} component={UserNew} />
          <Route path="/" component={UserList} />
        </Switch>
      </div>
    )
  }
}


export default withRouter(User);