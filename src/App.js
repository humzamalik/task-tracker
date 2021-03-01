import React, { Component } from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import TaskTrackerNew from './Components/TaskTrackerNew'
import TitleHeader from './Components/TitleHeader'
import "./Styles/main.css"
import ProtectedRoute from './Components/ProtectedRoute'


class App extends Component {
  render() {
    return (
      <>
        <TitleHeader title={'Task Tracker'}/>
        <Router>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <ProtectedRoute exact path="/" component={TaskTrackerNew}/>
              <ProtectedRoute component={TaskTrackerNew}/>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App