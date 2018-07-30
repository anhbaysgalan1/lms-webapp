import React, {Component} from 'react';
import {connect} from 'react-redux';

//action
import {fetchClassrooms, UpdateClassroom} from '../../actions/classroom';
import {fetchClassroom_withID} from '../../networks/classroom';
import {fetchCourse} from '../../networks/classcourse';
import {fetchListUser} from '../../networks/user';
import ClassroomEditForm from './Classroom.form/Classroom.form.edit';
import _ from 'lodash';
import {removeItem, RemoveDuplicate, allIDinList} from '../../utils';



class ClassroomDetail extends Component {
    constructor(props){
        super(props);
        this.state = ({
            _classSelected : null,
            option_course : null,
            list_teachers: null,
            list_teachers_not_in_class: null,
            list_teachers_in_class: null,
            list_member: null,
            list_member_in_class: null,
            list_member_not_in_class: null,
            objectChoose: null,
            isSubmitting: false,
        })
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.clickGetData = this.clickGetData.bind(this);
        this.removeData = this.removeData.bind(this);
    }

    async componentWillMount(){
        try {
            this.props.fetchClassrooms();
            const classID = this.props.match.params.id;
            const fetch = await fetchClassroom_withID(classID)
            const option = await fetchCourse();
            const get_data = await fetchListUser();
            this.setState({
                _classSelected : fetch,
                option_course : option.data,
                list_teachers: get_data.data.data,
                list_member: get_data.data.data,
            })

            const list_Remove_Duplicate_teachers = RemoveDuplicate(this.state._classSelected.teachers,this.state.list_teachers);
            const list_Remove_Duplicate_mem = RemoveDuplicate(this.state._classSelected.members,this.state.list_member)
            const list_teachers_not_in_class = []
            const list_member_not_in_class = [] 
            _.map(list_Remove_Duplicate_teachers,el=>{
                if (el.role === 1) {
                    list_teachers_not_in_class.push(el);
                }
            })
            _.map(list_Remove_Duplicate_mem,el=>{
                if (el.role === 0) {
                    list_member_not_in_class.push(el)
                }
            })
            this.setState({
                list_teachers_not_in_class : list_teachers_not_in_class,
                list_teachers_in_class: fetch.teachers,

                list_member_not_in_class: list_member_not_in_class,
                list_member_in_class: fetch.members,
            })
        } catch (error) {
            console.log(error);
        }
    }


    clickGetData(obj){      
        if (obj.role === 1){
            this.setState({
                list_teachers_in_class: [...this.state.list_teachers_in_class,obj],
                list_teachers_not_in_class: removeItem(this.state.list_teachers_not_in_class,obj)
            })
        }
        else if (obj.role === 0 ){
            this.setState({
                list_member_in_class: [...this.state.list_member_in_class,obj],
                list_member_not_in_class: removeItem(this.state.list_member_not_in_class,obj)
            })
        }
    }

    removeData(obj){
        if (obj.role === 1){
            this.setState({
                list_teachers_not_in_class: [...this.state.list_teachers_not_in_class,obj],
                list_teachers_in_class: removeItem(this.state.list_teachers_in_class,obj)
            })
        }
        else if (obj.role === 0){
            this.setState({
                list_member_not_in_class: [...this.state.list_member_not_in_class,obj],
                list_member_in_class: removeItem(this.state.list_member_in_class,obj)
            })
        }
        
    }

    
    render(){ 
        if (!this.state._classSelected){
            return <div>Loading...</div>
        }
        const classSelected = this.state._classSelected;
        const option_course = this.state.option_course;
        
        return (<div>
        {this.state.isSubmitting 
        ?<div>Submiting...</div>

        :<ClassroomEditForm 
            initialValues={classSelected}
            data_name_course = {option_course}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}

            list_teachers_in_class = {this.state.list_teachers_in_class}
            list_teachers_not_in_class = {this.state.list_teachers_not_in_class}

            list_member_in_class = {this.state.list_member_in_class}
            list_member_not_in_class = {this.state.list_member_not_in_class}

            clickGetData = {this.clickGetData}
            removeData = {this.removeData}
        />}
        </div>
        )
    }

    onSubmit(_class){
        const allID_Teachers = allIDinList(this.state.list_teachers_in_class);
        const allID_Members = allIDinList(this.state.list_member_in_class);
        _class.teachers = allID_Teachers;
        _class.members = allID_Members;
        this.props.UpdateClassroom(_class).then(()=>{
            this.setState({
                isSubmitting: true
            })
            this.onCancel();
        });
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