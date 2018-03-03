import React, { Component } from 'react'
import Results from './Results'
import axios from 'axios'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            keyword: '',
            borough: ''
        }
    }

    render() {
        return (
            <div>
                <form>
                    <input type='text' placeholder='health aide' />
                    <input type='text' placeholder='Brooklyn' />
                    <input type='submit' value='Search' />
                </form>
            </div>
        )
    }
}



class Home extends Component {
    constructor() {
        super()
        this.state = {
            courses: '',
            submitted: false
        }
    }

    componentDidMount() {
        this.getAllCourses()
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
        const { courses, submitted } = this.state
        console.log(this.state)

        return (
            <div>
                {submitted ?
                    <Results />
                    :
                    <Search />}
            </div>
        )
    }
}

export default Home 