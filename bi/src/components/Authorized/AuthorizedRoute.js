import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routerRedux } from 'dva/router';
import Authorized from './Authorized';
import { getAuthority } from '../../utils/authority';

class AuthorizedRoute extends React.Component {


  render() {
    const {
      component: Component,
      render,
      redirectPath,
      ...rest
    } = this.props;
    const userName = getAuthority();

    const havePermission = () => {
      return false;
    };

    if(!userName&&false) {
      return (
        <Authorized
          authority={havePermission}
          noMatch={
            <Route
              {...rest}
              render={() => <Redirect to={{ pathname: redirectPath }} />}
            />
          }
        >
          <Route
            {...rest}
            render={props =>
              (Component ? <Component {...props} /> : render(props))
            }
          />
        </Authorized>
      )
    } else {
      return (
        <Authorized
          authority={''}
          noMatch={
            <Route
              {...rest}
              render={() => <Redirect to={{ pathname: redirectPath }} />}
            />
          }
        >
          <Route
            {...rest}
            render={props =>
              (Component ? <Component {...props} /> : render(props))
            }
          />
        </Authorized>
      );
    }


  }
}

export default AuthorizedRoute;
