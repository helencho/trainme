import React, { Component } from 'react'
import Results from './Results'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            submitted: false
        }
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