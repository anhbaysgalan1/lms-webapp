import React, {Component} from 'react';
import {connect} from 'react-redux';

//action
import {fetchClassroom_withID} from '../../networks/classroom';

class ClassroomDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            _class : {},
            id_par : null,
        }
    }
    async componentWillMount(){
        const classID = this.props.match.params.id;
        const fetch = await fetchClassroom_withID(classID)
        // console.log(fetch);
        this.setState({_class : fetch})
    }
    
    render(){
        return <div>NameClass - {this.state._class.name}{this.state._class.course}</div>
    }
}


export default connect(null,{fetchClassroom_withID})(ClassroomDetail)