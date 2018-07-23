import {FETCH_CLASSROOM_ID, FETCH_CLASSROOM, DELETE_CLASSROOM, ADD_CLASSROOM,UPDATE_CLASSROOM, FETCH_COURSE_CLASSROOM} from '../actions/classroom';
import _ from 'lodash';


export default function(state = null,action){
    switch(action.type){

        case FETCH_CLASSROOM:
            return  _.mapKeys(action.payload.data,"_id")

        case UPDATE_CLASSROOM:
            return {
                ...state,
                [action.payload._id]: action.payload
            };
            
        case ADD_CLASSROOM:
            return {
            ...state,
            [action.payload._id]: action.payload
          };
        
        case DELETE_CLASSROOM:
            return _.omit(state,[action.payload.classID])
            

        default: 
            return state
    }
}