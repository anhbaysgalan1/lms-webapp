import axios from 'axios';
import _ from 'lodash';

import { API_AUTH } from 'statics/urls';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHECK_AUTH = 'CHECK AUTH';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export function login(username, password) {
  const body = { username, password };
  const request = axios.post(API_AUTH, body);
  const tokenInterceptor = response => new Promise(
    (resolve) => {
      resolve(response);
    },
  );
  return {
    type: LOGIN,
    payload: request.then(tokenInterceptor),
  };
}

export function checkAuth() {
  const request = axios.get(API_AUTH);
  return {
    type: CHECK_AUTH,
    payload: request,
  };
}
