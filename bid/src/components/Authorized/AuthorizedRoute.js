import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';
import { getAuthority } from '@/utils/authority';

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authority, redirectPath, ...rest } = this.props;
    const userName = getAuthority();

    const havePermission = () => {
      return false;
    };
    return (
      <Authorized
        // authority={userName ? '' : havePermission}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
      >
        <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
