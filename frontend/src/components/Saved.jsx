import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Detail from './Detail'
import '../stylesheets/results.css'

class Saved extends Component {
    constructor() {
        super()
        this.state = {
            courses: [],
            keyword: '',
            borough: '',
            course: [],
            openDetail: false
        }
    }

    componentDidMount() {
        this.getAllCourses()
    }

    // Get all courses from API 
    getAllCourses = () => {
        axios
            .get(`https://data.cityofnewyork.us/resource/5teq-yyit.json`)
            .then(res => {
                this.setState({
                    courses: res.data,
                    keyword: this.props.keyword,
                    borough: this.props.borough
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Handle search form input 
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // When user clicks on a course name, toggle openDetail to true, which will lead user to Detail component 
    handleDetailClick = course => {
        this.setState({
            course: course,
            openDetail: true
        })
    }

    // When user clicks back button in details, user is lead to results page
    handleBack = () => {
        this.setState({
            openDetail: false
        })
    }

    render() {
        const { courses, keyword, borough, course, openDetail } = this.state
        console.log(this.state)

        const results = JSON.parse(window.localStorage.getItem('courses')) || [];

        return (
            <div>
                {openDetail ?
                    <Detail course={course} />
                    :
                    <div className='results-container'>
                        <form>
                            <input type='text' name='keyword' placeholder='graphic design' value={keyword} onChange={this.handleInput} />
                            <input type='text' name='borough' placeholder='Queens' value={borough} onChange={this.handleInput} />
                        </form>
                        {results.map(course => (
                            <div onClick={() => this.handleDetailClick(course)} className='single-result-container'>
                                <p onClick={() => this.handleDetailClick(course)} className='result-course'>{course.course_name}</p>
                                <p className='result-org'>{course.organization_name}</p>
                                <p className='result-city'>{course.city}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default Saved 