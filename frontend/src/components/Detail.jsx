import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/detail.css'
import axios from 'axios';

class Detail extends Component {
    state = {isSaved: false}

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

        this.setState({
            isSaved: true
        })
    }

    unsaveCourse = () => {
        let course = this.props.course;
        let savedCourses = JSON.parse(window.localStorage.getItem('courses'));
        let courses = savedCourses ? [...savedCourses, course] : [course];
        let newArr = [];

        savedCourses.forEach(el => {
            if (JSON.stringify(el) !== JSON.stringify(course)) {
                newArr.push(el)
            }
        })

        window.localStorage.setItem('courses', JSON.stringify(newArr));

        this.setState({
            isSaved: false
        })
    }

    checkSaveState = () => {
        let savedCourses = JSON.parse(window.localStorage.getItem('courses'));
        let course = this.props.course;

        if (JSON.stringify(savedCourses).includes(JSON.stringify(course))) {
            this.setState({
                isSaved: true
            })
        }
    }
    componentDidMount() {
        this.getAllCourses();
        this.checkSaveState();
    }

    render() {
        const { isSaved } = this.state;
        const { course } = this.props;
        let savedCourses = JSON.parse(window.localStorage.getItem('courses'));
        console.log({state: this.state});
        console.log({savedCourses});
        console.log('checkSave:', JSON.stringify(savedCourses).includes(JSON.stringify(course)))

        return (
            <div className='detail-container'>
                <span className='x-btn' onClick={this.props.handleBack}>
                    <i class="fas fa-times" onClick={this.props.handleBack}></i>
                </span>
                <h2>{course.course_name || 'N/A'}</h2>
                <div className='detail-name' >Organization Name: {course.organization_name || 'N/A'}</div>
                
                <div className='detail-address' >Address: {course.address1 || 'N/A'} {course.city || 'N/A'} {course.zip_code || 'N/A'} {course.borough || 'N/A'}</div><br />
                <hr />
                <div className='detail-contact' >Contact: {course.contact_firstname || 'N/A'} {course.contact_lastname || 'N/A'}</div>
                <div className='contact-phone'>
                <div className='detail-phone' >Phone: {course.phone1 || 'N/A'}</div>
                <div className='detail-phone' >Fax: {course.fax || 'N/A'}</div><br />
                </div>
                <div className='detail-web' >Website: {<a href={course.website}>{course.website}</a> || 'N/A'}</div><br />
                <hr />
                <div className='detail-type' >Training Type: {course.delivery_method || 'N/A'}</div>
                <div className='detail-class' >Max Class Size: {course.max_class_size || 'N/A'}</div>                
                <div className='detail-instructor' >Instructor Credentials: {course.instructor_credentials || 'N/A'}</div>
                <div className='detail-hra' >HRA Approved: {course.is_hra || 'N/A'}</div><br/>
                <hr />
                <div className='detail-description' >About This Course: {course.coursedescription || 'N/A'}</div><br/>
                <div className='detail-schedule' >Schedule: {course.schedule || 'N/A'}</div>
                <div className='detail-placement' >Job Placement Services: {course.job_placement_services ? 'Available' : 'Not Available'}</div>
                <div className='detail-financial' >Financial Aid Services: {course.financial_aid_services ? 'Available' : 'Not Available'}</div><br/>
                <hr />
                <div className='detail-total' >Cost Total: {course.cost_total || 'N/A'}</div>
                <div className='detail-includes' >Cost Includes: {course.cost_includes}</div>
                <div className='detail-not-include' >Cost Does Not Include: {course.cost_does_not_include || 'N/A'}</div><br/>

                <div className='detail-duration' >Duration: {course.duration || 'N/A'} {course.duration_unit || 'N/A'} </div><br/>
                <hr />
                <div className='detail-prereq' >Prerequisites: {course.prerequisites || 'N/A'}</div>

                {isSaved 
                    ? <button className='saveBtn' onClick={this.unsaveCourse}>Unsave Posting</button> 
                    : <button className='unsaveBtn' onClick={this.saveCourse}>Save Posting</button>
                }

            </div>
        )
    }
}

export default Detail 