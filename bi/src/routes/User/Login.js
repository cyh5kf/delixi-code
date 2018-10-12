import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import SHA256 from 'sha256';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    isRemember: true,

  }

  handleSubmit = (err, values) => {
    const { isRemember } = this.state;
    const params = {
      userName: values.mobile,
      pwd: SHA256('123'),
      code: values.captcha,
      isRemember: isRemember? 1: 0
    }
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: params
      });
    }
  }

  changeIsRemember = (e) => {
    this.setState({
      isRemember: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
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
            userName: fieldsValue.mobile
          }
        });
      }
    })
  }

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
    const { isRemember } = this.state;
    return (
      <div className={styles.main}>
        <Login
          ref="loginForm"
          onSubmit={this.handleSubmit}
        >
          {
            login.status === 'error' &&
            !login.submitting &&
            this.renderMessage('验证码错误')
          }
          <Mobile name="mobile" />
          <Captcha name="captcha" vcodestatus={login.vcodestatus} checkmobile={this.onCheckMobile} changevcodestatus={this.changeVcodeStatus} />
          <div>
            <Checkbox checked={isRemember} onChange={this.changeIsRemember}>7日免登录</Checkbox>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
