import axios from 'axios';
import { API_CLASSROOM, API_PLAYLIST } from '../statics/urls';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export async function updateClassroomPromise(obj_class) {
  const update = await axios.put(`${API_CLASSROOM}/${obj_class._id}`, obj_class);
  return update.data.data;
}

export async function deleteClassroomPromise(obj_class) {
  const deleteFunc = axios.delete(`${API_CLASSROOM}/${obj_class._id}`);
  return {
    classID: obj_class._id,
    deleteFunc: await deleteFunc,
  };
}

export async function addClassroomPromise(obj_class) {
  const classAdd = await axios.post(API_CLASSROOM, obj_class);
  return classAdd.data.data;
}

export async function fetchClass() {
  const data_get = await axios.get(API_CLASSROOM);
  return data_get.data;
}

export async function fetchClassroomWithID(id) {
  const data_get = await axios.get(`${API_CLASSROOM}/${id}`);
  return data_get.data.data;
}

export async function fetchPlaylists() {
  const data_get = await axios.get(API_PLAYLIST);
  return data_get.data.data;
}
