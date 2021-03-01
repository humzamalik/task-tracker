import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'


class ProtectedRoute extends Component {
    render() {
        const Component = this.props.component
        const token = Cookies.get("token")
        return token ? (
            <Component />
        ) : (
            <Redirect to={'/login'} />
        )
    }
}

export default ProtectedRoute
