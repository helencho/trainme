import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Detail from './Detail'
import '../stylesheets/results.css'

class Results extends Component {
    constructor() {
      super()
      this.state = {
        courses: [],
        keyword: '',
        borough: '',
        hra: false,
        job: false,
        financial: false,
        course: [],
        openDetail: false,
        messages: ['Please try a different search.', 'Couldn\'t find anything :(', 'Nothing found. Womp womp.']
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

    // When user clicks on a checkbox, sets the checkbox to true or false
    handleCheckbox = e => {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    randomMessage = () => {
        let index = Math.floor(Math.random() * this.state.messages.length)
        return this.state.messages[index]
    }

    render() {
        const { courses, keyword, borough, hra, job, financial, course, openDetail } = this.state
        console.log(this.state)

        // Filter through courses by course description, course name, keyword
        const results = courses
          .filter(course =>
            course.coursedescription && course.coursedescription.toLowerCase().includes(keyword.toLowerCase())
              || course.course_name && course.course_name.toLowerCase().includes(keyword.toLowerCase())
              || course.keywords && course.keywords.toLowerCase().includes(keyword.toLowerCase()))
          .filter(result => result.borough && result.borough.toLowerCase().includes(borough.toLowerCase()))
          .filter(result => hra ? result.is_hra && result.is_hra.toLowerCase() === 'yes' : result)
          .filter(result => job ? result.job_placement_services : result)
          .filter(result => financial ? result.financial_aid_services : result)

        // Filter through the keyword search by borough, hra, job, and financial
        // const results = keywordFilter

        console.log(results)

        return (
            <div>
                {openDetail ?
                    <Detail course={course} handleBack={this.handleBack} />
                    :
                    <div className='results-container'>
                        <form>
                            <input type='text' name='keyword' placeholder='graphic design' value={keyword} onChange={this.handleInput} />
                            <input type='text' name='borough' placeholder='Queens' value={borough} onChange={this.handleInput} />
                        </form>
                        <form>
                            <input type='checkbox' name='hra' checked={hra} onChange={this.handleCheckbox} />HRA Approved
                            <input type='checkbox' name='job' checked={job} onChange={this.handleCheckbox} />Job Placement
                            <input type='checkbox' name='financial' checked={financial} onChange={this.handleCheckbox} />Financial Services

                        </form>
                        {results.length > 0 ?
                            results.map(course => (
                                <div onClick={() => this.handleDetailClick(course)} className='single-result-container'>
                                    <p onClick={() => this.handleDetailClick(course)} className='result-course'>{course.course_name}</p>
                                    <p className='result-org'>{course.organization_name}</p>
                                    <p className='result-city'>{course.city}</p>
                                </div>
                            ))
                            :
                            <p className='results-message'>{this.randomMessage()}</p>}
                    </div>
                }
            </div>
        )
    }
}

export default Results
