import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClassroomForm from './Classroom.form/Classroom.form';
import {fetchClassrooms,AddClassroom} from '../../actions/classroom';
import {fetchCourse} from '../../networks/classcourse';


class ClassroomNew extends Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = ({
			option_courses : null,
			isSubmitting: false
		});
	}
	async componentWillMount(){
		try {
			const fetchData = await fetchCourse();
			if (!this.props.classroomReducer){
				this.props.fetchClassrooms(); 
			}
			this.setState({
				option_courses: fetchData.data
			});
		} catch (error) {
			console.log(error);
		}
        
	}

	render(){
		// console.log("New Side");
		// console.log(Object.keys(par_data));
		if (!this.state.option_courses){
			return <div>Loading...</div>;
		}
		return <div>
			{this.state.isSubmitting 
				? <div>Submitting....</div>

				: <ClassroomForm 
					initialValues = {{
						course : '',
						_class : '',
						teachers: [],
						members: []
					}}
					data_name_course = {this.state.option_courses}
					onSubmit={this.onSubmit}
					onCancel={this.props.history.goBack}
				/>}
        
		</div>;
	}
	onSubmit(_class){
		this.props.AddClassroom(_class).then(
			()=>{
				this.setState({
					isSubmitting: true
				});
				this.props.history.goBack();
			}
		);
	}
}

const actions = {
	fetchClassrooms,
	AddClassroom
};

function MapsConnectReducer({classroomReducer}){
	return {classroomReducer};
}

export default connect(MapsConnectReducer,actions)(ClassroomNew);