import React, { Component } from 'react';
import Detail from './components/Detail';
import Home from './components/Home';
import Results from './components/Results';
import { Link, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';


class App extends Component {
  constructor() {
    super()
    this.state = {
      courses: '',
      submitted: false
    }
  }

  updateCourses = data => {
    this.setState({
      courses: data
    })
  }

  renderHome = () => {
    return (
      <Home courses={this.state.course} updateCourses={this.updateCourses} submitted={this.state.submitted} />
    )
  }

  renderDetail = () => {
    return (
      <Detail courses={this.state.courses} updateCourses={this.updateCourses} />
    )
  }

  handleLogoClick = () => {
    return (
      <Home submitted={this.state.submitted} />
    )
  }

  render() {
    let date = new Date()

    return (
      <div>
        <nav className='navbar'>
          <Link to='/' onClick={this.handleLogoClick}>TrainMe</Link>
        </nav>
        <Switch>
          <Route exact path='/' render={this.renderHome} />
          <Route path='/detail' render={this.renderDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
