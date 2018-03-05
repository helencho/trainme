import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Detail from './Detail'
import '../stylesheets/results.css'
import _ from 'lodash'

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
        messages: [
          'Please try a different search.',
          'Couldn\'t find anything :(',
          'Nothing found. Womp womp.',
          'No courses that meet your criteria.', 
          'Try a simpler search.']
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
        }).catch(console.log)
    }

    // Handle search form input
    handleInput = e => {
      this.setState({ [e.target.name]: e.target.value })
    }

    // When user clicks on a course name, toggle openDetail to true, which will lead user to Detail component
    handleDetailClick = course => {
      this.setState({
        course,
        openDetail: true,
      })
    }

    // When user clicks back button in details, user is lead to results page
    handleBack = () => {
      this.setState({ openDetail: false })
    }

    // When user clicks on a checkbox, sets the checkbox to true or false
    handleCheckbox = e => {
      this.setState({ [e.target.name]: !this.state[e.target.name] })
    }

    randomMessage = () => {
      let index = Math.floor(Math.random() * this.state.messages.length)
      return this.state.messages[index]
    }

    render() {
      const { courses, borough, hra, job, financial, course, openDetail } = this.state
      const keyword = this.state.keyword.toLowerCase()

      // Filter through courses by course description, course name, keyword and checkbox toggles
      const filteredCourses = courses
        .filter(course =>
          course.coursedescription && course.coursedescription.toLowerCase().includes(keyword)
            || course.course_name && course.course_name.toLowerCase().includes(keyword)
            || course.keywords && course.keywords.toLowerCase().includes(keyword))
        .filter(result => result.borough ? result.borough.toLowerCase().includes(borough.toLowerCase()): result)
        // .filter(({ borough }) => _.includes(borough.toLowerCase(), borough.toLowerCase())) // Didn't work correctly. Need to look at again!
        .filter(result => hra ? result.is_hra && result.is_hra.toLowerCase() === 'yes' : result)
        .filter(result => job ? result.job_placement_services : result)
        .filter(result => financial ? result.financial_aid_services : result)

      const results = _.isEmpty(filteredCourses)
        ? <p className='results-message'>{this.randomMessage()}</p>
        :  filteredCourses.map(course => (
            <div onClick={() => this.handleDetailClick(course)} className='single-result-container'>
              <p onClick={() => this.handleDetailClick(course)} className='result-course'>{course.course_name}</p>
              <p className='result-org'>{course.organization_name}</p>
              <p className='result-city'>{course.city}</p>
            </div>
          ))

      return (
        <div>
            { openDetail
              ? <Detail course={course} handleBack={this.handleBack} />
              : <div className='results-container'>
                <form>
                  <input type='text' name='keyword' placeholder='graphic design' value={keyword} onChange={this.handleInput} />
                  <input type='text' name='borough' placeholder='Queens' value={borough} onChange={this.handleInput} />
                </form>
                <form className='checkbox-container'>
                  <input type='checkbox' name='hra' checked={hra} onChange={this.handleCheckbox} />HRA Approved
                  <input type='checkbox' name='job' checked={job} onChange={this.handleCheckbox} />Job Placement
                  <input type='checkbox' name='financial' checked={financial} onChange={this.handleCheckbox} />Financial Services
                </form>
                  { results }
                </div>
            }
        </div>
      )
    }
}

export default Results
