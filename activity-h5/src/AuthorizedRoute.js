import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { message } from 'antd';
import AjaxUtils from 'utils/AjaxUtils';
import LoginStore from './stores/LoginStore';

class AuthorizedRoute extends React.Component {

  componentWillMount() {
      
  }

  render() {
    const { component: Component, ...rest } = this.props

    var token = LoginStore.getToken();
    // var token = true;
    
    return (
      <Route {...rest} render={props => {
        return token
          ? <Component {...props} />
          : <Redirect to="/login" />
      }} />
    )
  }
}

export default AuthorizedRoute;