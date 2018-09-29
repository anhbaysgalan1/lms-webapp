import {
  fetchClass, addClassroomPromise, deleteClassroomPromise, updateClassroomPromise, fetchMemberNotInClassroomPromise
} from '../networks/classroom';
import { API_CLASSROOM } from '../statics/urls';
import axios from 'axios';
import { getUnicodeSearchName } from 'utils';

export const FETCH_CLASSROOM_ID = 'FETCH_CLASSROOM_ID';
export const ADD_COURSE_CLASSROOM = 'ADD_COURSE_CLASSROOM';
export const FETCH_CLASSROOM = 'FETCH_CLASSROOM';
export const DELETE_CLASSROOM = 'DELETE_CLASSROOM';
export const ADD_CLASSROOM = 'ADD_CLASSROOM';
export const UPDATE_CLASSROOM = 'UPDATE_CLASSROOM';
export const FETCH_COURSE_CLASSROOM = 'FETCH_COURSE_CLASSROOM';
export const FETCH_CLASSROOM_PAGE = 'FETCH_CLASSROOM_PAGE';
export const FETCH_MEMBER_NOTIN_CLASSROOM = 'FETCH_MEMBER_NOTIN_CLASSROOM';

export const optionCourse = ['C4E', 'CI', 'WEB'];

export function fetchClassroomPagination(number, limit, q){
  const keyword = q ? getUnicodeSearchName(q) : null;
  const request = axios.get(`${API_CLASSROOM}?page=${number|| 1}&limit=${limit || 30}${keyword ? '&q='+keyword : ''}`)
  return {
    type: FETCH_CLASSROOM_PAGE,
    payload: request,
  }
}

export function fetchClassrooms() {
  return {
    type: FETCH_CLASSROOM,
    payload: fetchClass(),
  };
}

export function AddClassroom(objAdd) {
  return {
    type: ADD_CLASSROOM,
    payload: addClassroomPromise(objAdd),
  };
}

export function UpdateClassroom(_class) {
  return {
    type: UPDATE_CLASSROOM,
    payload: updateClassroomPromise(_class),
  };
}

export function deleteClassroom(classroom) {
  return {
    type: DELETE_CLASSROOM,
    payload: deleteClassroomPromise(classroom),
  };
}

export function fetchMemberNotInClassroom(classroomId) {
  return {
    type: FETCH_MEMBER_NOTIN_CLASSROOM,
    payload: fetchMemberNotInClassroomPromise(classroomId),
  };
}
