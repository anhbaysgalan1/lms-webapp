import axios from 'axios';
import { API_VIDEO } from 'statics/urls';
import { fieldsNotEmpty } from 'utils';

axios.defaults.validateStatus = status => status < 500;
axios.defaults.withCredentials = true;

export default function searchVideo(terms) {
  const searchUrl = `${API_VIDEO}?q=${terms}`;
  return new Promise((resolve, reject) => {
    axios.get(searchUrl).then((response) => {
      const responseData = response.data;
      if (fieldsNotEmpty(responseData, 'success', 'data')) {
        resolve(responseData.data);
      } else {
        reject(new Error('something bad happened'));
      }
    })
      .catch(reject);
  });
}

export async function fetchListVideo() {
  const request = await axios.get(API_VIDEO);
  return request;
}
