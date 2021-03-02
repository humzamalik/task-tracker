import React, { Component } from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import TaskTrackerNew from './Components/TaskTrackerNew'
import TitleHeader from './Components/TitleHeader'
import "./Styles/main.css"
import ProtectedRoute from './Components/ProtectedRoute'
import Cookies from 'js-cookie'


class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      logoutVisibilty: false,
      token: Cookies.get("token")
    }
  }
  
  setLogoutVisibilty = (flag) => {
    this.setState({
      logoutVisibilty: flag,
    })
  }

  setToken = (token) => {
    this.setState({token})
    if(token){
      this.setLogoutVisibilty(true)
    } else {
      this.setLogoutVisibilty(false)
    }
  }
  
  componentDidMount(){
    const { token } = this.state
    if(token){
      this.setLogoutVisibilty(true)
    }
  }

  render() {
    const { logoutVisibilty, token } = this.state
    return (
      <>
        <TitleHeader title={'Task Tracker'} logoutVisibilty={logoutVisibilty} setToken={this.setToken}/>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/signup" to='/' flag={!token} component={Signup}/>
            <ProtectedRoute exact path="/login" to='/' flag={!token} component={Login} setToken={this.setToken}/>
            <ProtectedRoute exact path="/" to='/login' flag={token} name={"hamza"} component={TaskTrackerNew} />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App