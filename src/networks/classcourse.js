import axios from "axios";
import {API_CLASSROOM_COURSE} from '../statics/urls';


export async function fetchCourse(){
    let data_get = await axios.get(API_CLASSROOM_COURSE);
    return data_get.data
}

export async function AddCourse(Course){
    let data_to_post = {course : Course.newcourse}
    let post = await axios.post(API_CLASSROOM_COURSE,data_to_post)
    return post.data.data
}

export async function DeleteCourse(course){
    console.log("Run through Network");
    const deleteFunc = axios.delete(`${API_CLASSROOM_COURSE}/${course._id}`)
    return {
        courseID : course._id,
        deleteFunc : await deleteFunc
    }
}