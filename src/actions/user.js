export const FETCH_USER = "Fetch user";
export const ADD_USER = "Add user";
export const UPDATE_USER = "Update user";
export const DELETE_USER = "Delete user";

export const dummyUsers = [
  {
    _id: "1",
    username: "huynhtuananh",
    password: "1234",
    email: "gmail@gmail.com",
    role: "teacher",
  },
  {
    _id: "2",
    username: "quy",
    password: "1234",
    email: "yahoo@gmail.com",
    role: "student",
  },
  {
    _id: "3",
    username: "lipton",
    password: "1234",
    email: "bing@gmail.com",
    role: "student",
  },
  {
    _id: "4",
    username: "oishi",
    password: "1234",
    email: "techkids@gmail.com",
    role: "teacher",
  },
  {
    _id: "5",
    username: "mac",
    password: "window",
    email: "apple@microsoft.com",
    role: "teacher"
  }
]

export function fetchUsers(){
  return {
    type: FETCH_USER,
    payload: dummyUsers
  }
}

export function updateUser(user){
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: user
  }
}

export function deleteUser(user) {
  return {
    type: DELETE_USER,
    payload: user
  }
}