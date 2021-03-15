import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

class ProtectedRoute extends Component {
    render() {
        const {component: Component, flag, to, ...rest} = this.props
        return (
          <Route render={() => (
            flag ? (
              <Component {...rest} />
            ) : (
              <Redirect to={to}/>
            )
          )}/>
        )
    }
}

export default ProtectedRoute
