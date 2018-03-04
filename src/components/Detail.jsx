import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/detail.css'
import axios from 'axios';

class Detail extends Component {
    state = { isSaved: false }

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
        console.log({ state: this.state });
        console.log({ savedCourses });
        console.log('checkSave:', JSON.stringify(savedCourses).includes(JSON.stringify(course)))

        return (
            <div className='detail-container'>
                <span className='x-btn' onClick={this.props.handleBack}>
                    <i class="fas fa-times" onClick={this.props.handleBack}></i>
                </span>

                <div className='detail-section'>
                    <h2>{course.course_name || 'N/A'}</h2>
                    <p className='detail-name'>{course.organization_name || 'N/A'}</p>
                    <p className='detail-address'>{course.address1 || 'N/A'} {course.city || 'N/A'} {course.zip_code || 'N/A'} {course.borough || 'N/A'}</p>
                </div>
                <hr />
                <div className='detail-section detail-section-column'>
                    <div>
                        <p className='detail-contact'>Contact: {course.contact_firstname || 'N/A'} {course.contact_lastname || 'N/A'}</p>
                        <p className='detail-phone'>Phone: {course.phone1 || 'N/A'}</p>
                        <p className='detail-phone'>Fax: {course.fax || 'N/A'}</p>
                        <p className='detail-web'>Website: {course.website ? <a href={course.website} target='_blank'>{course.website}</a> : 'n/a'}</p>
                    </div>
                    <div>
                        <p className='detail-type'>Training Type: {course.delivery_method || 'N/A'}</p>
                        <p className='detail-instructor'>Instructor Credentials: {course.instructor_credentials || 'N/A'}</p>
                        <p className='detail-class'>Max Class Size: {course.max_class_size || 'N/A'}</p>
                        <p className='detail-class'>HRA Approved: {course.is_hra || 'N/A'}</p>
                    </div>
                </div>
                <hr />
                <div className='detail-section'>
                    <p className='detail-description'>About This Course</p>
                    <p>{course.coursedescription || 'N/A'}</p>
                </div>
                <hr />
                {/* <p className='detail-schedule' >Schedule: {course.schedule || 'N/A'}</p> */}
                <div className='detail-section'>
                    <p className='detail-duration'>Duration: {course.duration || 'N/A'} {course.duration_unit.toLowerCase() || 'N/A'} </p>
                    <p className='detail-placement'>Job placement is {course.job_placement_services ? 'available' : 'not available'}</p>
                    <p className='detail-services'>Financial aid is {course.financial_aid_services ? 'offered' : 'not offered'}</p>
                </div>
                <hr />
                <div className='detail-section'>
                    <p className='detail-total'>Cost Total: ${course.cost_total || 'N/A'}</p>
                    <p className='detail-includes'>Cost Includes: {course.cost_includes}</p>
                    {/* <p className='detail-not-include'>Cost Does Not Include: {course.cost_does_not_include || 'N/A'}</p> */}
                    <p className='detail-prereq'>Prerequisites: {course.prerequisites || 'N/A'}</p>
                </div>
                <hr />

                {isSaved
                    ? <button className='saveBtn' onClick={this.unsaveCourse}>Unsave Posting</button>
                    : <button className='unsaveBtn' onClick={this.saveCourse}>Save Posting</button>
                }

            </div>
        )
    }
}

export default Detail 