import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import ClassroomList from './Classroom.list';
import ClassroomNew from './Classroom.new';
import ClassroomDetail from './Classroom.detail';


import {
  ROUTE_ADMIN_CLASSROOM,
  ROUTE_ADMIN_CLASSROOM_NEW,
  ROUTE_ADMIN_CLASSROOM_DETAIL_ID,
} from '../routes';

function Classroom() {
  return (
    <div className="h-100">
      <Switch>
        <Route path={ROUTE_ADMIN_CLASSROOM_NEW} component={ClassroomNew} />
        <Route path={ROUTE_ADMIN_CLASSROOM_DETAIL_ID} component={ClassroomDetail} />
        <Route path={ROUTE_ADMIN_CLASSROOM} component={ClassroomList} />
      </Switch>
    </div>
  );
}

export default withRouter(Classroom);
