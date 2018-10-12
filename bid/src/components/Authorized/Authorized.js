import React from 'react';
import CheckPermissions from './CheckPermissions';
import {removeAuthority} from '../../utils/authority.js'

class Authorized extends React.Component {

  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
