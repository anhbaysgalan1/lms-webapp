import axios from 'axios';
import { API_CLASSROOM_COURSE } from '../statics/urls';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export async function fetchCourse() {
  const dataGet = await axios.get(API_CLASSROOM_COURSE);
  return dataGet.data;
}

export async function fetchCourseWithID(id) {
  const dataGet = await axios.get(`${API_CLASSROOM_COURSE}/${id}`);
  return dataGet.data.data;
}

export async function updateCourse(objCourse) {
  const update = await axios.put(`${API_CLASSROOM_COURSE}/${objCourse._id}`, objCourse);
  return update.data.data;
}

export async function AddCourse(Course) {
  const dataToPost = { course: Course.newcourse, session: Course.session };
  const post = await axios.post(API_CLASSROOM_COURSE, dataToPost);
  return post.data.data;
}

export async function DeleteCourse(course) {
  const deleteFunc = axios.delete(`${API_CLASSROOM_COURSE}/${course._id}`);
  return {
    courseID: course._id,
    deleteFunc: await deleteFunc,
  };
}
