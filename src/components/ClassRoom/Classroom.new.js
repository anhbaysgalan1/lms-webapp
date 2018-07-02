import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClassroomForm from './Classroom.form';
import {fetchClassrooms,AddClassroom} from '../../actions/classroom';
import _ from 'lodash';


class ClassroomNew extends Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        if (!this.props.classroomReducer){
            this.props.fetchClassrooms(); 
        }
    }

    render(){
        const par_data = this.props.classroomReducer;
        // console.log("New Side");
        // console.log(Object.keys(par_data));
        const ID_form = _.map(par_data).length + 1
        console.log(ID_form);

        return <div><ClassroomForm 
        initialValues = {{
            name_class : "",
            course : "",
            id_form: ID_form,
            teacher: [],
            member: []
        }}
        data_name_course = {par_data}
        onSubmit={this.onSubmit}
        /> 
        </div>
    }
    onSubmit(_class){
        console.log("After Submit");
        console.log(_class);
        this.props.AddClassroom(_class);
        this.props.history.goBack();
    }
}

const actions = {
    fetchClassrooms,
    AddClassroom
}

function MapsConnectReducer({classroomReducer}){
    return {classroomReducer}
}

export default connect(MapsConnectReducer,actions)(ClassroomNew)