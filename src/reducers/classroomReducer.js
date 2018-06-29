import { FETCH_CLASSROOMS, DELETE_CLASSROOM } from '../actions/classroom';
import _ from 'lodash';


export default function(state = null,action){
    switch(action.type){
        case FETCH_CLASSROOMS:
            return _.mapKeys(action.payload,"_id");
        
        case DELETE_CLASSROOM:
            return _.omit(state,[action.payload._id])

        default: 
            return state
    }
}