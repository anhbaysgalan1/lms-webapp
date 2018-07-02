import Axios from "axios";
export const FETCH_CLASSROOMS = "FETCH_CLASSROOM";
export const DELETE_CLASSROOM = "DELETE_CLASSROOM";
export const ADD_CLASSROOM = "ADD_CLASSROOM";

export const getDataFromApi = ()=>{
    const link = 'https://script.googleusercontent.com/macros/echo?user_content_key=0LAFs_GsQIXdbiQLMjfJZOSHYiFOygpPDqjrdqq8S7aAVYDZMUqFS75JTaC4r7iEHIvt0v4r5tfT-27j9cP026QmCxV_w3f5m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMsKiIXTz3tgnYHUTOGxsoR9dw_IsukHEwyO2jMqkyO7R_ur--GOpDsoRMKsK-3ZvHzg0rkC0yCGAWHLB10OX8nSVwPQJ4CQoQ&lib=MWl8Y-z6flalVg-cTCTVjQEg7c8OIFd-h';
    const test_axios = Axios.get(link);
    return test_axios;
}

export const classroomlist = [
    {
        _id: 1,
        course: 'C4E',
        _class: 14,
        teachers: ["Huỳnh Tuấn Anh", "Nguyễn Quang Huy"],
        member : []
    },
    {
        _id: 2,
        course: 'C4E',
        _class: 18,
        teachers: [],
        member : []
    },
    { 
        _id: 3,
        course: 'CI',
        _class: 11,
        teachers: [],
        members : []
    },
    {
        _id: 4,
        course: 'Web',
        _class: 11,
        teachers: [],
        members : []
    },
]
export function fetchClassrooms(){
    return {
        type : "FETCH_CLASSROOM",
        payload: classroomlist
    }
}

export function AddClassroom(obj_add){
    return {
        type: "ADD_CLASSROOM",
        payload: obj_add
    }
}

export function deleteClassroom(classroom){
    return {
        type: "DELETE_CLASSROOM",
        payload: classroom
    }
} 