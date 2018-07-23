import axios from "axios";
import {API_CLASSROOM} from '../statics/urls';



export async function updateClassroomPromise(obj_class){
    console.log(obj_class);
    
    const update = await axios.put(`${API_CLASSROOM}/${obj_class._id}`,obj_class)
    console.log(obj_class);
    
    return update.data.data
}

export async function deleteClassroomPromise(obj_class){
    const deleteFunc = axios.delete(`${API_CLASSROOM}/${obj_class._id}`)
    return {
        classID :obj_class._id,
        deleteFunc : await deleteFunc
    }
}

export async function addClassroomPromise(obj_class){
    let classAdd = await axios.post(API_CLASSROOM,obj_class)
    return classAdd.data.data
}

export async function fetchClass(){
    let data_get = await axios.get(API_CLASSROOM);
    return data_get.data
}

export async function fetchClassroom_withID(id) {
    let data_get = await axios.get(`${API_CLASSROOM}/${id}`);
    return data_get.data.data
}



