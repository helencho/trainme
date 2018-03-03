import React, { Component } from 'react'

class Results extends Component {
    constructor() {
        super()
        this.state = {
            courses: [],
            keyword: '',
            borough: ''
        }
    }

    componentDidMount() {
        this.setState({
            keyword: this.props.keyword,
            borough: this.props.borough
        })
    }

    getAllCourses = () => {
        axios
            .get(`https://data.cityofnewyork.us/resource/5teq-yyit.json`)
            .then(res => {
                this.props.updateCourses(res.data)
                this.setState({
                    courses: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { courses, keyword, borough } = this.state

        const keywordFilter = courses.filter(course => course.coursedescription && course.coursedescription.toLowerCase().includes(keyword)
            || course.course_name && course.course_name.toLowerCase().includes(keyword))
        const results = keywordFilter.filter(result => result.borough && result.borough.toLowerCase().includes(borough))
        console.log(results)

        return (
            <div>
                {results.map(course => <div><p>{course.course_name}</p></div>)}
            </div>
        )
    }
}

export default Results 