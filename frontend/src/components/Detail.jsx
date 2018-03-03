import React, { Component } from 'react';
import axios from 'axios';

class Detail extends Component {
    constructor() {
        super()
        this.state = {
            courses: '',
            courseIndex: 8,
            course: ''
        }
    }

    getAllCourses = () => {
        let { updateCourses } = this.props;

        axios
            .get(`https://data.cityofnewyork.us/resource/5teq-yyit.json`)
            .then(res => {
                updateCourses(res.data);
                this.setState({
                    courses: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateDetailComponent = () => {
        this.setState({
            course: this.props.courses
        })
    }

    componentDidMount() {
        this.getAllCourses();
        this.updateDetailComponent();
    }

    render() {
        console.log({props: this.props});
        console.log({state: this.state});
        return (
            <div>
                <h1>Detailed description on job</h1>
                <span>Organization Name</span>
                <span>Address1</span>
                <span>City</span>
                <span>Zip Code (number)</span>
                <span>Borough</span>
                <span>Neighborhood</span>
                <span>Phone1 (number)</span>
                <span>Fax (number)</span>
                <span>Website</span>
                <span>Job Placement Services</span>
                <span>Financial Aid Services</span>
                <span>Contact FirstName</span>
                <span>Contact LastName</span>
                <span>course name</span>
                <span>CourseDescription</span>
                <span>Keywords</span>
                <span>Cost Total</span>
                <span>Money</span>
                <span>Cost Includes</span>
                <span>Cost Does Not Include</span>
                <span>Duration (number)</span>
                <span>Duration Unit</span>
                <span>NumHours (number)</span>
                <span>Prerequisites</span>
                <span>Max Class Size (number)</span>
                <span>Years Course Offered</span>
                <span>Instructor Credentials</span>
                <span>Delivery Method</span>
                <span>Schedule</span>
                <span>Is HRA</span>
                <span>Is SBS</span>
            </div>
        )
    }
}

export default Detail 