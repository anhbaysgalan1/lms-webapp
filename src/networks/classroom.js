import { classroomlist } from "../actions/classroom";

export async function fetchClassroom_withID(id) {
    const classrooms = await classroomlist.filter((_class) => {
        return _class._id == id
    })   
    return classrooms[0];
}