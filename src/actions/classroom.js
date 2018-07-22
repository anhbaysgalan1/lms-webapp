import { AddCourse, fetchCourse, fetchClass,addClassroomPromise,deleteClassroomPromise,updateClassroomPromise} from '../networks/classroom'

export const FETCH_CLASSROOM_ID = "FETCH_CLASSROOM_ID";
export const ADD_COURSE_CLASSROOM = "ADD_COURSE_CLASSROOM";
export const FETCH_CLASSROOM = "FETCH_CLASSROOM";
export const DELETE_CLASSROOM = "DELETE_CLASSROOM";
export const ADD_CLASSROOM = "ADD_CLASSROOM";
export const UPDATE_CLASSROOM = "UPDATE_CLASSROOM";
export const FETCH_COURSE_CLASSROOM = "FETCH_COURSE_CLASSROOM";


export const option_course = ["C4E","CI","WEB"]

export function fetchClassrooms(){
    return {
        type : FETCH_CLASSROOM,
        payload: fetchClass()
    }
}

export function AddClassroom(obj_add){
    return {
        type: ADD_CLASSROOM,
        payload: addClassroomPromise(obj_add)
    }
}

export function UpdateClassroom(_class){
    return {
        type: UPDATE_CLASSROOM,
        payload: updateClassroomPromise(_class)
    }
}

export function deleteClassroom(classroom){
    return {
        type: DELETE_CLASSROOM,
        payload: deleteClassroomPromise(classroom)
    }
} 