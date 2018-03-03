import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Detail from './Detail'

class Results extends Component {
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

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = course => {
        this.setState({
            course: course,
            openDetail: true
        })
    }

    render() {
        const { courses, keyword, borough, course, openDetail } = this.state
        console.log(this.state)

        const keywordFilter = courses.filter(course => course.coursedescription && course.coursedescription.toLowerCase().includes(keyword)
            || course.course_name && course.course_name.toLowerCase().includes(keyword))
        const results = keywordFilter.filter(result => result.borough && result.borough.toLowerCase().includes(borough))

        return (
            <div>
                {openDetail ?
                    <Detail course={course} />
                    :
                    <div>
                        <nav>
                            <input type='text' name='keyword' placeholder='graphic design' value={keyword} onChange={this.handleInput} />
                            <input type='text' name='borough' placeholder='Queens' value={borough} onChange={this.handleInput} />
                        </nav>
                        <div>
                            {results.map(course => <div>
                                <p onClick={() => this.handleClick(course)}>{course.course_name}</p>
                                <p>{course.organization_name}</p>
                            </div>)}
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default Results 