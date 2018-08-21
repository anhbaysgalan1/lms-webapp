import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import ClassroomNewCourse from './Classroom.newcourse';
import ClassroomDetailCourse from './Classroom.detail.course';
import ClassroomCourseList from './Classroom.list.course';

import {
  ROUTE_ADMIN_CLASSROOM_NEW_COURSE,
  ROUTE_ADMIN_CLASSROOM_DETAIL_COURSE_ID,
  ROUTE_ADMIN_CLASSROOM_COURSE,
} from '../routes';

function ClassroomCourse() {
  return (
    <div className="h-100">
      <Switch>
        <Route path={ROUTE_ADMIN_CLASSROOM_DETAIL_COURSE_ID} component={ClassroomDetailCourse} />
        <Route path={ROUTE_ADMIN_CLASSROOM_NEW_COURSE} component={ClassroomNewCourse} />
        <Route path={ROUTE_ADMIN_CLASSROOM_COURSE} component={ClassroomCourseList} />
      </Switch>
    </div>
  );
}

export default withRouter(ClassroomCourse);
