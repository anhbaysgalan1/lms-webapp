import axios from "axios";
const link = "https://test-lms-server.herokuapp.com"


export async function fetchCourse(){
    let data_get = await axios.get(`${link}/api/courseclassroom`);
    return data_get.data
}

export async function AddCourse(Course){
    let data_to_post = {course : Course.newcourse}
    let post = await axios.post(`${link}/api/courseclassroom`,data_to_post)
    return post.data.data
}

export async function DeleteCourse(course){
    console.log("Run through Network");
    const deleteFunc = axios.delete(`${link}/api/courseclassroom/${course._id}`)
    return {
        courseID : course._id,
        deleteFunc : await deleteFunc
    }
}