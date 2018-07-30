import React, { Component } from 'react';
import  { Formik } from 'formik';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


class ClassroomFormNewCourse extends Component {
	constructor(props) {
		super(props);
		this.validate = this.validate.bind(this);
		this.renderForm = this.renderForm.bind(this);
	}

	validate(values) {
		const errors = {};
		if (!values.newcourse){
			errors.newcourse = 'New Course can\'t be blank!';
		}
		return errors;
	}

	renderForm(formProps) {
		const {
			values,
			errors,
			touched,
			handleChange,
			handleBlur,
			handleSubmit,
			// isSubmitting,
		} = formProps;

		const {
			newcourse
		} = values;
    
		return (
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label>New Course</Label>
					<Input
						type='text'
						name='newcourse'
						value={newcourse}
						onBlur={handleBlur}
						onChange={handleChange}
						invalid={touched.newcourse && !!errors.newcourse}
					/>
					<div className="text-danger">{touched.newcourse ? errors.newcourse : ''}</div>
				</FormGroup>
            
				<Button className="mx-1"
					onClick = {this.props.onCancel}>Back</Button>
				<Button className="btn btn-info ">Add</Button>

			</Form>
      
		);
	}

	// onSubmit(values, {setSubmitting, setErrors}) {
	// }

	render() {
		return (
			<Formik
				initialValues={this.props.initialValues}
				validate={this.validate}
				onSubmit={this.props.onSubmit}
				render={this.renderForm}
			/>
		);
	}
}

export default ClassroomFormNewCourse;