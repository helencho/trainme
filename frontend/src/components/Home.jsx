import React, { Component } from 'react'
import Results from './Results'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            keyword: '',
            borough: '',
            submitted: false
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            submitted: true
        })
    }

    render() {
        const { keyword, borough, submitted } = this.state
        console.log(this.state)


        return (
            <div>
                {submitted ?
                    <Results keyword={keyword} borough={borough} />
                    :
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input type='text' name='keyword' value={keyword} placeholder='health aide' onChange={this.handleInput} />
                            <input type='text' name='borough' value={borough} placeholder='Brooklyn' onChange={this.handleInput} />
                            <input type='submit' value='Search' />
                        </form>
                    </div>
                }
            </div>
        )
    }
}

export default Home 