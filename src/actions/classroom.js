export const FETCH_CLASSROOMS = "FETCH_CLASSROOM";
export const DELETE_CLASSROOM = "DELETE_CLASSROOM";


export const classroomlist = [
    {
        _id: 1,
        name: 'C4E',
        course: 14,
        teachers: ["Huỳnh Tuấn Anh", "Nguyễn Quang Huy"],
        member : []
    },
    {
        _id: 2,
        name: 'C4E',
        course: 18,
        teachers: [],
        member : []
    },
    { 
        _id: 3,
        name: 'CI',
        course: 11,
        teachers: [],
        members : []
    },
    {
        _id: 4,
        name: 'Web',
        course: 11,
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

export function deleteClassroom(classroom){
    return {
        type: "DELETE_CLASSROOM",
        payload: classroom
    }
} 