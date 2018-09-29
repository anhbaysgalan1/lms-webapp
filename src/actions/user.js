import {
  fetchListUser, addUser as addUserPromise,
  deleteUser as deleteUserPromise,
  updateUser as updateUserPromise,
  addBulkUser as addBulkUserPromise,
} from 'networks/user';
import axios from 'axios';
import { API_USER } from '../statics/urls';
import { getUnicodeSearchName } from 'utils';

export const FETCH_USER = 'Fetch user';
export const ADD_USER = 'Add user';
export const UPDATE_USER = 'Update user';
export const DELETE_USER = 'Delete user';
export const FETCH_USER_PAGE = 'FETCH_USER_PAGE';
export const ADD_BULK_USER = 'Add bulk user';

export function fetchUsers() {
  return {
    type: FETCH_USER,
    payload: fetchListUser(),
  };
}

export function fetchUserPagination(number, limit, q) {
  const keyword = q ? getUnicodeSearchName(q) : null;
  const request = axios.get(`${API_USER}?page=${number|| 1}&limit=${limit || 30}${keyword ? '&q='+keyword : ''}`);
  return {
    type: FETCH_USER_PAGE,
    payload: request,
  };
}


export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: updateUserPromise(user),
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: addUserPromise(user),
  };
}

export function addBulkUser(classroom, studentData) {
  return {
    type: ADD_BULK_USER,
    payload: addBulkUserPromise(classroom, studentData),
  };
}

export function deleteUser(user) {
  return {
    type: DELETE_USER,
    payload: deleteUserPromise(user),
  };
}
