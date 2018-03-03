import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/detail.css'
import axios from 'axios';

class Detail extends Component {

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

    componentDidMount() {
        this.getAllCourses();
    }

    render() {
        const { course } = this.props;
        const {  } = this.props;
        console.log('Detail Props:', this.props);
        console.log('Detail State:', this.state);
        return (
            <div className='detail-container'>
                <h1>{course.course_name || 'N/A'}</h1>
                <div className='detail-name' >Organization Name: {course.organization_name || 'N/A'}</div>
                
                <div className='detail-address' >Address: {course.address1 || 'N/A'} {course.city || 'N/A'} {course.zip_code || 'N/A'} {course.borough || 'N/A'}</div>
                <div className='detail-contact' >Contact: {course.contact_firstname || 'N/A'} {course.contact_lastname || 'N/A'}</div>
                <div className='detail-phone' >Phone: {course.phone1 || 'N/A'}</div>
                <div className='detail-fax' >Fax: {course.fax || 'N/A'}</div>
                <div className='detail-web' >Website: {<a href={course.website}>{course.website}</a> || 'N/A'}</div>

                <div className='detail-type' >Training Type: {course.delivery_method || 'N/A'}</div>
                <div className='detail-class' >Max Class Size: {course.max_class_size || 'N/A'}</div>                
                <div className='detail-instructor' >Instructor Credentials: {course.instructor_credentials || 'N/A'}</div>
                <div className='detail-hra' >HRA Approved: {course.is_hra || 'N/A'}</div><br/>

                <div className='detail-description' >About This Course: {course.coursedescription || 'N/A'}</div><br/>
                <div className='detail-' >Schedule: {course.schedule || 'N/A'}</div>
                <div className='detail-' >Job Placement Services: {course.job_placement_services ? 'Available' : 'Not Available'}</div>
                <div className='detail-' >Financial Aid Services: {course.financial_aid_services ? 'Available' : 'Not Available'}</div><br/>

                <div className='detail-' >Cost Total: {course.cost_total || 'N/A'}</div>
                <div className='detail-' >Cost Includes: {course.cost_includes}</div>
                <div className='detail-' >Cost Does Not Include: {course.cost_does_not_include || 'N/A'}</div><br/>

                <div className='detail-' >Duration: {course.duration || 'N/A'} {course.duration_unit || 'N/A'} </div><br/>
                
                <div className='detail-' >Prerequisites: {course.prerequisites || 'N/A'}</div>
            </div>
        )
    }
}

export default Detail 