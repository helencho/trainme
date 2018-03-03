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

    // Handle search form input 
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Handle search form submit 
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
                    <Results keyword={keyword} borough={borough} handleLogoClick={this.handleLogoClick}/>
                    :
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input type='text' name='keyword' value={keyword} placeholder='Business, design, health' onChange={this.handleInput} />
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