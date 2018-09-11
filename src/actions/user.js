import {
  fetchListUser, addUser as addUserPromise,
  deleteUser as deleteUserPromise,
  updateUser as updateUserPromise,
} from 'networks/user';
import axios from 'axios';
import { API_USER } from '../statics/urls';

export const FETCH_USER = 'Fetch user';
export const ADD_USER = 'Add user';
export const UPDATE_USER = 'Update user';
export const DELETE_USER = 'Delete user';
export const FETCH_USER_PAGE = 'FETCH_USER_PAGE';

export function fetchUsers() {
  return {
    type: FETCH_USER,
    payload: fetchListUser(),
  };
}

export function fetchUserPagination(number, limit) {
  const request = axios.get(`${API_USER}?page=${number}&limit=${limit}`);
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

export function deleteUser(user) {
  return {
    type: DELETE_USER,
    payload: deleteUserPromise(user),
  };
}
