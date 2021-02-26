import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class ProtectedRoute extends Component {
    render() {
        const Component = this.props.component;
        const isAuthenticated = false
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={'/login'} />
        );
    }
}

export default ProtectedRoute
