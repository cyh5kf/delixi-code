import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
  };

  handleSubmit = (err, values) => {
    const params = {
      userName: values.mobile,
      vCode: values.captcha,
      pwd: values.password
    }
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: params
      });
    }
  }

  onCheckMobile = () => {
    const loginForm = this.refs['loginForm'];
    loginForm.validateFieldsAndScroll(['mobile'], (err, fieldsValue) => {
      if(err) {
        return false;
      } else {
        const reg = /^1\d{10}$/;
        if(!reg.test(fieldsValue.mobile)) {
          loginForm.setFields({
            mobile: {
              value: fieldsValue.mobile,
              errors: [new Error('手机号格式错误！')],
            },
          });
          return false;
        }
        // 发送验证码
        this.props.dispatch({
          type: 'login/sendVcode',
          payload: {
            mobile: fieldsValue.mobile
          }
        });
      }
    })
  }

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  changeVcodeStatus = () => {
    this.props.dispatch({
      type: 'login/changeVcodeStatus',
      payload: {
        vcodestatus: undefined
      }
    });
  }

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login
          ref="loginForm"
          onSubmit={this.handleSubmit}
        >
          <Mobile name="mobile" />
          <Captcha name="captcha" vcodestatus={login.vcodestatus} checkmobile={this.onCheckMobile} changevcodestatus={this.changeVcodeStatus} />
          <Password name="password" />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
