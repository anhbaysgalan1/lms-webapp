import React, {Component} from 'react';
import {connect} from 'react-redux';
import {classroomReducer} from '../../reducers/classroomReducer';

//action
import {fetchClassrooms, UpdateClassroom} from '../../actions/classroom';
import {fetchClassroom_withID} from '../../networks/classroom';
import Axios from 'axios';
import {fetchCourse} from '../../networks/classcourse';
import _ from 'lodash';
import ClassroomEditForm from './Classroom.form/Classroom.form.edit';



class ClassroomDetail extends Component {
    constructor(props){
        super(props);
        this.state = ({
            _classSelected : null,
            option_course : null,
        })
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    async componentWillMount(){
        this.props.fetchClassrooms();
        const classID = this.props.match.params.id;
        const fetch = await fetchClassroom_withID(classID)
        const option = await fetchCourse();
        this.setState({
            _classSelected : fetch,
            option_course : option.data
        })
    }
    
    render(){ 
        if (!this.state._classSelected){
            return <div>Loading...</div>
        }
        const classSelected = this.state._classSelected;
        const option_course = this.state.option_course;
        
        return (    
        <ClassroomEditForm 
            initialValues={classSelected}
            data_name_course = {option_course}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />
        )
    }

    onSubmit(_class){
        console.log(_class);
        this.props.UpdateClassroom(_class);
        this.onCancel();
    }

    onCancel(){
        this.props.history.goBack();
    }
}

//________________________________________
function MapsReducer({classroomReducer}){
    return {classroomReducer}
}

const actions = {
    fetchClassrooms,
    UpdateClassroom,
}


export default connect(MapsReducer,actions)(ClassroomDetail);