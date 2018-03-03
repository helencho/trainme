import React, { Component } from 'react'
import Results from './Results'

class Home extends Component {
    constructor() {
        super()
        this.state = {
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
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { submitted } = this.state

        return (
            <div>
                {submitted ?
                    <Results />
                    :
                    <h1>Show home</h1>}
            </div>
        )
    }
}

export default Home 