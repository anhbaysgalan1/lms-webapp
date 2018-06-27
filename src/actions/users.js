export const FETCH_USERS = "Fetch users";
export const ADD_USERS = "Add users";
export const UPDATE_USER_ROLE = "Update user role";
export const DELETE_USERS = "Delete users";

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
    type: FETCH_USERS,
    payload: dummyUsers
  }
}

export function updateUserRole(user){
  return {
    type: UPDATE_USER_ROLE,
    payload: user
  }
}

export function addUser(user) {
  return {
    type: ADD_USERS,
    playload: user
  }
}

export function deleteUser(user) {
  return {
    type: DELETE_USERS,
    payload: user
  }
}