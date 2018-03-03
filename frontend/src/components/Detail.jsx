import React, { Component } from 'react';
import axios from 'axios';

class Detail extends Component {
    constructor() {
        super()
        this.state = {
            courses: '',
            courseIndex: 8,
            course: {
                "address1": "6930 AUSTIN ST",
                "borough": "Queens",
                "city": "FOREST HILLS",
                "contact_firstname": "Mark",
                "contact_lastname": "Mirenberg",
                "cost_includes": "Classroom Hours 45   Lab Hours 30   Internship Hours 0   Practical Hours 0",
                "cost_total": "5550",
                "course_name": "Certificate In Medical Office Assistant - Spring Semester",
                "coursedescription": "In order to better help students acquire the basic and specialized skills necessary to pursue a career in administrative assistance  the Department of Office Technology offers an up-to-date curriculum  based on today's industry needs and recent advances in technology. Accordingly  students in Office Technology receive personalized training and tutoring from highly experienced instructors in modern laboratories equipped with the most recent software. Furthermore  there is a very strong emphasis on teaching students with hands-on training in simulated office environments.",
                "delivery_method": "Classroom Training",
                "duration": "75",
                "duration_unit": "Hour(s)",
                "fax": "7185755119",
                "financial_aid_services": "Some types of Financial Aid are provided.",
                "is_hra": "No",
                "is_sbs": "No",
                "job_placement_services": "Job Placement Services are available.",
                "keywords": "Receptionist  Office Clerk  Executive Secretary  Administrative Assistant  microsoft  office  account  bookkeep  audit  quickbooks  bookkeeper  bookkeeping  excel  word",
                "neighborhood": "Ridgewood - Forest Hills",
                "numhours": "75",
                "organization_name": "Bramson ORT College (Main Campus-Queens)",
                "phone1": "7182615800",
                "prerequisites": "None",
                "schedule": "Check with school to receive most updated schedule",
                "state": "New York",
                "website": "http://bramsonort.edu",
                "zip_code": "11375"
            }
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
        if (null) {

            this.setState({
                course: this.props.courses[8].address1
            })
        }
    }

    componentDidMount() {
        this.getAllCourses();
        this.updateDetailComponent();
    }

    render() {
        const { course } = this.props;
        const {  } = this.props;
        console.log('Detail Props:', this.props);
        console.log('Detail State:', this.state);
        return (
            <div>
                <h1>Detailed description on job</h1>
                <div>course name: {course.course_name || 'N/A'}</div>
                <div>CourseDescription: {course.coursedescription || 'N/A'}</div>
                <div>Organization Name: {course.organization_name || 'N/A'}</div>
                <div>Address: {course.address1 || 'N/A'}</div>
                <div>City: {course.city || 'N/A'}</div>
                <div>Zip Code: {course.zip_code || 'N/A'}</div>
                <div>Borough: {course.borough || 'N/A'}</div>
                <div>Neighborhood: {course.neighborhood || 'N/A'}</div>
                <div>Phone: {course.phone1 || 'N/A'}</div>
                <div>Fax: {course.fax || 'N/A'}</div>
                <div>Website: {course.website || 'N/A'}</div>
                <div>Job Placement Services: {course.job_placement_services || 'N/A'}</div>
                <div>Financial Aid Services: {course.financial_aid_services || 'N/A'}</div>
                <div>Contact FirstName: {course.contact_firstname || 'N/A'}</div>
                <div>Contact LastName: {course.contact_lastname || 'N/A'}</div>
                <div>Keywords: {course.keywords || 'N/A'}</div>
                <div>Cost Total: {course.cost_total || 'N/A'}</div>
                <div>Cost Includes: {course.cost_includes}</div>
                <div>Cost Does Not Include: {course.cost_does_not_include || 'N/A'}</div>
                <div>Duration: {course.duration || 'N/A'} </div>
                <div>Duration Unit: {course.duration_unit || 'N/A'}</div>
                <div>NumHours: {course.numhours || 'N/A'}</div>
                <div>Prerequisites: {course.prerequisites || 'N/A'}</div>
                <div>Max Class Size: {course.max_class_size || 'N/A'}</div>
                <div>Years Course Offered: {course.years_course_offered || 'N/A'}</div>
                <div>Instructor Credentials: {course.instructor_credentials || 'N/A'}</div>
                <div>Delivery Method: {course.delivery_method || 'N/A'}</div>
                <div>Schedule: {course.schedule || 'N/A'}</div>
                <div>Is HRA: {course.is_hra || 'N/A'}</div>
                <div>Is SBS: {course.is_sbs || 'N/A'}</div>
            </div>
        )
    }
}

export default Detail 