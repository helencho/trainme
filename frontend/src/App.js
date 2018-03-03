import React, { Component } from 'react';
import Detail from './components/Detail';
import Home from './components/Home';
import Results from './components/Results';
import { Link, Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor() {
    super()
    this.state = {
      courses: ''
    }
  }

  updateCourses = data => {
    this.setState({
      courses: data 
    })
  }

  renderHome = () => {
    return (
      <Home courses={this.state.course} updateCourses={this.updateCourses} />
    )
  }

  renderDetail = () => {
    return (
      <Detail courses={this.state.courses} updateCourses={this.updateCourses} />
    )
  }

  render() {
    return (
      <div>
        <nav>
          <Link to='/'>TrainMe</Link>
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
