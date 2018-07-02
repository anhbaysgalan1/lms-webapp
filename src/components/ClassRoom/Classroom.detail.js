import React, {Component} from 'react';
import {connect} from 'react-redux';

//action
import {fetchClassroom_withID} from '../../networks/classroom';
import Axios from 'axios';

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
        const fetch = fetchClassroom_withID(classID)
        // console.log(fetch);
        // console.log(test_axios.data);
        this.setState({_class : fetch})
    }
    
    render(){
        return <div>NameClass</div>
    }
}


export default connect(null,{fetchClassroom_withID})(ClassroomDetail)