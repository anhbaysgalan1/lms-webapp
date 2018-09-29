import axios from 'axios';
import { API_CLASSROOM, API_PLAYLIST } from '../statics/urls';
import { getUnicodeSearchName } from 'utils';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export async function updateClassroomPromise(objClass) {
  const update = await axios.put(`${API_CLASSROOM}/${objClass._id}`, objClass);
  return update.data.data;
}

export async function deleteClassroomPromise(objClass) {
  const deleteFunc = axios.delete(`${API_CLASSROOM}/${objClass._id}`);
  return {
    classID: objClass._id,
    deleteFunc: await deleteFunc,
  };
}

export async function addClassroomPromise(objClass) {
  const classAdd = await axios.post(API_CLASSROOM, objClass);
  return classAdd.data.data;
}

export async function fetchClass() {
  const datGet = await axios.get(API_CLASSROOM);
  return datGet.data.data;
}

export async function fetchClassroomWithID(id) {
  const dataGet = await axios.get(`${API_CLASSROOM}/${id}`);
  return dataGet.data.data;
}

export async function fetchPlaylists() {
  const dataGet = await axios.get(API_PLAYLIST);
  return dataGet.data.data;
}

export async function fetchMemberNotInClassroomPromise(classroomId, q) {
  const keyword = q ? getUnicodeSearchName(q) : null;
  const dataGet = await axios.get(`${API_CLASSROOM}/${classroomId}/membersnotin${keyword ? '?q='+keyword : ''}`);
  return dataGet.data.data;
}

export async function fetchPlaylistNotInClassroomPromise(classroomId, q) {
  const keyword = q ? getUnicodeSearchName(q) : null;
  const dataGet = await axios.get(`${API_CLASSROOM}/${classroomId}/playlistsnotin${keyword ? '?q='+keyword : ''}`);
  return dataGet.data.data;
}

export async function fetchTeacherNotInClassroomPromise(classroomId, q) {
  const keyword = q ? getUnicodeSearchName(q) : null;
  const dataGet = await axios.get(`${API_CLASSROOM}/${classroomId}/teachersnotin${keyword ? '?q='+keyword : ''}`);
  return dataGet.data.data;
}