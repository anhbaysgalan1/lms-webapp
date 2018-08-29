import {
  fetchListUser, addUser as addUserPromise,
  deleteUser as deleteUserPromise,
  updateUser as updateUserPromise,
  addBulkUser as addBulkUserPromise,
} from 'networks/user';

export const FETCH_USER = 'Fetch user';
export const ADD_USER = 'Add user';
export const UPDATE_USER = 'Update user';
export const DELETE_USER = 'Delete user';
export const ADD_BULK_USER = 'Add bulk user';

export function fetchUsers() {
  return {
    type: FETCH_USER,
    payload: fetchListUser(),
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
