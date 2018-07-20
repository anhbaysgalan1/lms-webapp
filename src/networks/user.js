import axios from 'axios';
import {API_USER} from 'statics/urls'


export async function fetchUserById(id) {
  const userID = axios.get(`${API_USER}/${id}`);
  return await userID
  
}

export async function fetchListUser(){
    let listUser = axios.get(API_USER);
    return await listUser
}

export async function addUser(user) {
  let userAdd =  axios.post(API_USER, user);
  return await userAdd

}

export async function updateUser(user) {
  let userUpdate = axios.put(`${API_USER}/${user._id}`, user)
  return await userUpdate
}

export async function deleteUser(id) {
  let userDel = axios.delete(`${API_USER}/${id}`);
  return {
    userDel: await userDel,
    userId: id
  }
}



