import React, { Component } from 'react';
import Detail from './components/Detail';
import Home from './components/Home';
import Results from './components/Results';
import Saved from './components/Saved';
import { Link, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import './stylesheets/navbar.css';

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
          <Link to='/' onClick={this.handleLogoClick}><img src='https://i.imgur.com/FXL7KnU.png' alt='logo' className='logo' /></Link>
          <Link to='/saved'><i class="far fa-bookmark"></i></Link>
        </nav>
        <Switch>
          <Route exact path='/' render={this.renderHome} />
          <Route path='/saved' component={Saved} />
        </Switch>
      </div>
    );
  }
}

export default App;
