import {fetchCourse, AddCourse, DeleteCourse} from '../networks/classcourse';

export const FETCH_COURSE_CLASSROOM = "FETCH_COURSE_CLASSROOM";
export const UPDATE_COURSE_CLASSROOM = "UPDATE_COURSE_CLASSROOM";
export const ADD_COURSE_CLASSROOM = "ADD_COURSE_CLASSROOM";
export const DELETE_COURSE_CLASSROOM = "DELETE_COURSE_CLASSROOM";

export function AddCourseAction(course){
    return {
        type: ADD_COURSE_CLASSROOM,
        payload: AddCourse(course)
    }
}
export function FetchCourseAction(){
    return {
        type: FETCH_COURSE_CLASSROOM,
        payload: fetchCourse()
    }
}

export function DeleteCourseAction(classroom){
    return {
        type: DELETE_COURSE_CLASSROOM,
        payload: DeleteCourse(classroom)
    }
} 
