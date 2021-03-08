import React, { Component } from 'react'
import "./index.css"
import "./Styles/main.css"
import Cookies from 'js-cookie'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Header from './Components/Header'
import TaskTracker from './Components/TaskTracker'
import ProtectedRoute from './Components/ProtectedRoute'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      token: Cookies.get("token")
    }
  }

  setToken = (token) => {
    this.setState({token})
  }

  render() {
    const { token } = this.state
    return (
      <>
        <Header
          title={'Task Tracker'}
          token={token}
          setToken={this.setToken}
        />
        <Router>
          <Switch>
            <ProtectedRoute
              exact
              path="/signup"
              to='/'
              flag={!token}
              component={Signup}
            />
            <ProtectedRoute
              exact
              path="/login"
              to='/'
              flag={!token}
              component={Login}
              setToken={this.setToken}
            />
            <ProtectedRoute
              exact
              path="/"
              to='/login'
              flag={token}
              name={"hamza"}
              component={TaskTracker}
            />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App