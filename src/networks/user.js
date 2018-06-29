import {dummyUsers} from "../actions/user";

export function fetchUserById(id) {
  return new Promise((resolve, reject) => {
    const user = dummyUsers.filter((user) => {
      return user._id === id;
    })[0];
    resolve(user);
  })
}