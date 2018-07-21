import {UPDATE_COURSE_CLASSROOM,ADD_COURSE_CLASSROOM,DELETE_COURSE_CLASSROOM,FETCH_COURSE_CLASSROOM} from '../actions/classcourse'; 
import _ from 'lodash'

export default function(state = null,action){
    switch(action.type){

        case FETCH_COURSE_CLASSROOM:
            return  _.mapKeys(action.payload.data,"_id")

        case UPDATE_COURSE_CLASSROOM:
        case ADD_COURSE_CLASSROOM:
            console.log(action.payload);
            
            return {
            ...state,
            [action.payload._id]: action.payload
          };
        
        case DELETE_COURSE_CLASSROOM:
            return _.omit(state,[action.payload.courseID])

        
        case FETCH_COURSE_CLASSROOM: 
            return  _.mapKeys(action.payload.data,"_id")
            

        default: 
            return state
    }
}