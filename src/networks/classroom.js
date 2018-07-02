import { classroomlist } from "../actions/classroom";
import { getDataFromApi} from "../actions/classroom";

export async function fetchClassroom_withID(id) {
    const test = await getDataFromApi();
    console.log(test.data);
    const classrooms = await classroomlist.filter((_class) => {
        return _class._id === id
    })   
    return classrooms[0];
}