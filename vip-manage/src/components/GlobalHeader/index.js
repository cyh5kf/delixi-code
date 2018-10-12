import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { getAuthority } from '../../utils/authority';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }

  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      collapsed, isMobile, logo, onLogOutClick
    } = this.props;
    const userInfo = JSON.parse(getAuthority());
    return (
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          {userInfo ? (
            <>
            <span className={styles.name}>{userInfo.username}</span>
            <span className={`${styles.action} ${styles.account}`}>
              <span  onClick={onLogOutClick}><Icon type="logout" />关闭系统</span>
            </span>
            </>
          ) : <Spin size="small" style={{ marginLeft: 8 }} />}
        </div>
      </div>
    );
  }
}
