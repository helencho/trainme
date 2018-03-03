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

    saveCourse = () => {
        let course = this.props.course;
        let savedCourses = JSON.parse(window.localStorage.getItem('courses'));
        let courses = savedCourses ? [...savedCourses, course] : [course];
        window.localStorage.setItem('courses', JSON.stringify(courses));
    }
    componentDidMount() {
        this.getAllCourses();
    }

    render() {
        const { course } = this.props;
        let savedCourses = JSON.parse(window.localStorage.getItem('courses'));
        console.log({savedCourses});
        return (
            <div className='detail-container'>
                <h2>{course.course_name || 'N/A'}</h2>
                <div className='detail-name' >Organization Name: {course.organization_name || 'N/A'}</div><br />
                
                <div className='detail-address' >Address: {course.address1 || 'N/A'} {course.city || 'N/A'} {course.zip_code || 'N/A'} {course.borough || 'N/A'}</div>
                <div className='detail-contact' >Contact: {course.contact_firstname || 'N/A'} {course.contact_lastname || 'N/A'}</div>
                <div className='contact-phone'>
                <div className='detail-phone' >Phone: {course.phone1 || 'N/A'}</div>
                <div className='detail-phone' >Fax: {course.fax || 'N/A'}</div><br />
                </div>
                <div className='detail-web' >Website: {<a href={course.website}>{course.website}</a> || 'N/A'}</div><br />

                <div className='detail-type' >Training Type: {course.delivery_method || 'N/A'}</div>
                <div className='detail-class' >Max Class Size: {course.max_class_size || 'N/A'}</div>                
                <div className='detail-instructor' >Instructor Credentials: {course.instructor_credentials || 'N/A'}</div>
                <div className='detail-hra' >HRA Approved: {course.is_hra || 'N/A'}</div><br/>

                <div className='detail-description' >About This Course: {course.coursedescription || 'N/A'}</div><br/>
                <div className='detail-schedule' >Schedule: {course.schedule || 'N/A'}</div>
                <div className='detail-placement' >Job Placement Services: {course.job_placement_services ? 'Available' : 'Not Available'}</div>
                <div className='detail-financial' >Financial Aid Services: {course.financial_aid_services ? 'Available' : 'Not Available'}</div><br/>

                <div className='detail-total' >Cost Total: {course.cost_total || 'N/A'}</div>
                <div className='detail-includes' >Cost Includes: {course.cost_includes}</div>
                <div className='detail-not-include' >Cost Does Not Include: {course.cost_does_not_include || 'N/A'}</div><br/>

                <div className='detail-duration' >Duration: {course.duration || 'N/A'} {course.duration_unit || 'N/A'} </div><br/>

                <div className='detail-prereq' >Prerequisites: {course.prerequisites || 'N/A'}</div>

                <button onClick={this.saveCourse}>Save</button>
                <button onClick={this.props.handleBack}>Back</button>

            </div>
        )
    }
}

export default Detail 