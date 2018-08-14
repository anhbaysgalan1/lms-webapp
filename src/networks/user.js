import axios from 'axios';
import { API_USER } from 'statics/urls';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;


export async function fetchUserById(id) {
  const userID = await axios.get(`${API_USER}/${id}`);
  return userID;
}

export async function fetchListUser() {
  const listUser = await axios.get(API_USER);
  return listUser;
}

export async function addUser(user) {
  const userAdd = await axios.post(API_USER, user);
  return userAdd;
}

export async function updateUser(user) {
  const userUpdate = await axios.put(`${API_USER}/${user._id}`, user);
  return userUpdate;
}

export async function deleteUser(id) {
  const userDel = await axios.delete(`${API_USER}/${id}`);
  return {
    userDel,
    userId: id,
  };
}
