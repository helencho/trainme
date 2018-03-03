import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <div>
                <h1>{course.course_name || 'N/A'}</h1>
                <div class='' >Organization Name: {course.organization_name || 'N/A'}</div>
                <div class='' >Website: {<a href={course.website}>{course.website}</a> || 'N/A'}</div>
                <div class='' >Address: {course.address1 || 'N/A'} {course.city || 'N/A'} {course.zip_code || 'N/A'} {course.borough || 'N/A'}</div>
                <div class='' >Contact: {course.contact_firstname || 'N/A'} {course.contact_lastname || 'N/A'}</div>
                <div class='' >Phone: {course.phone1 || 'N/A'}</div>
                <div class='' >Fax: {course.fax || 'N/A'}</div>
                <div class='' >Training Type: {course.delivery_method || 'N/A'}</div>
                <div class='' >Max Class Size: {course.max_class_size || 'N/A'}</div>                
                <div class='' >Instructor Credentials: {course.instructor_credentials || 'N/A'}</div>
                <div class='' >HRA Approved: {course.is_hra || 'N/A'}</div>
                <div class='' >About This Course: {course.coursedescription || 'N/A'}</div>
                <div class='' >Schedule: {course.schedule || 'N/A'}</div>
                <div class='' >Job Placement Services: {course.job_placement_services ? 'Available' : 'Not Available'}</div>
                <div class='' >Financial Aid Services: {course.financial_aid_services ? 'Available' : 'Not Available'}</div>
                <div class='' >Cost Total: {course.cost_total || 'N/A'}</div>
                <div class='' >Cost Includes: {course.cost_includes}</div>
                <div class='' >Cost Does Not Include: {course.cost_does_not_include || 'N/A'}</div>
                <div class='' >Duration: {course.duration || 'N/A'} {course.duration_unit || 'N/A'} </div>
                <div class='' >Prerequisites: {course.prerequisites || 'N/A'}</div>

                <button onClick={this.saveCourse}>Save</button>
                <button onClick={this.props.handleBack}>Back</button>
            </div>
        )
    }
}

export default Detail 