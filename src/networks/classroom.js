import { classroomlist } from "../actions/classroom";
import axios from "axios";
const link = "http://localhost:9000"



export async function updateClassroomPromise(obj_class){
    const update = await axios.put(`${link}/api/classrooms/${obj_class._id}`,obj_class)
    return update.data.data
}

export async function deleteClassroomPromise(obj_class){
    const deleteFunc = axios.delete(`${link}/api/classrooms/${obj_class._id}`)
    return {
        classID :obj_class._id,
        deleteFunc : await deleteFunc
    }
}

export async function addClassroomPromise(obj_class){
    let classAdd = await axios.post(`${link}/api/classrooms`,obj_class)
    return classAdd.data.data
}

export async function fetchClass(){
    let data_get = await axios.get(`${link}/api/classrooms`);
    return data_get.data
}

export async function fetchClassroom_withID(id) {
    let data_get = await axios.get(`${link}/api/classrooms/${id}`);
    return data_get.data.data
}



