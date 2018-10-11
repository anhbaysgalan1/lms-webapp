import _ from 'lodash';
import {
  LOGIN, CHECK_AUTH, LOGOUT,
} from '../actions/auth';

export default function (state = { user: null, errMsg: null }, action) {
  switch (action.type) {
    case LOGIN: {
      const success = _.get(action.payload, 'data.success');
      const data = _.get(action.payload, 'data.data.user');
      const message = _.get(action.payload, 'data.message');
      return success
        ? { ...state, user: data, errMsg: null }
        : { ...state, user: null, errMsg: message };
    }
    case CHECK_AUTH: {
      const success = _.get(action.payload, 'data.success');
      const data = _.get(action.payload, 'data.data.user');
      return success ? { ...state, user: data, errMsg: null }
        : { ...state, user: null, errMsg: null };
    }
    case LOGOUT:
      return { user: null, errMsg: null };
    default:
      return state;
  }
}
