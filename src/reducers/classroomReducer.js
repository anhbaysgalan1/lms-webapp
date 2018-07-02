import { FETCH_CLASSROOMS, DELETE_CLASSROOM, ADD_CLASSROOM} from '../actions/classroom';
import _ from 'lodash';


export default function(state = null,action){
    switch(action.type){
        case FETCH_CLASSROOMS:
            return _.mapKeys(action.payload,"_id");

        case DELETE_CLASSROOM:
            return _.omit(state,[action.payload._id])

        case ADD_CLASSROOM:
            return {
            ...state,
            [action.payload._id]: action.payload
          };

        default: 
            return state
    }
}