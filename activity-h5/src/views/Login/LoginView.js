import React from 'react';
import './LoginView.less';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {

    handleSubmit= (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.actions.doLogin(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {isLoading} = this.props.store;

        return (
            <div className="login-view">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div className="login-title">人众金服活动引擎系统</div>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入你的用户名!'}],
                        })(
                            <Input addonBefore={<Icon type="user" />} placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入你的密码!'}],
                        })(
                            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const LoginView = Form.create()(LoginForm);
export default LoginView;