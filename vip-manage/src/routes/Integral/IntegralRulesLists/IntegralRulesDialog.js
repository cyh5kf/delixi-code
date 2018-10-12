import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const IntegralRulesDialog = Form.create({
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({
                ...props.name,
                value: props.name.value,
            }),
            note:Form.createFormField({
                ...props.note,
                value: props.note.value,
            }),
            status:Form.createFormField({
                ...props.status,
                value: props.status.value,
            }),
            bonus_points:Form.createFormField({
                ...props.bonus_points,
                value:props.bonus_points.value
            })
        };
    },
})((props) => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            fieldsValue.id=props.id.value;
            handleAdd(fieldsValue);
        });
    };

    const { getFieldDecorator } = form;

    return (
        <Modal
            title="添加积分规则"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            okText="保存"
        >
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="规则名称"
            >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入规则名称！' }],
                })(
                    <Input placeholder="请输入规则名称" />
                    )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="备注"
            >
                {getFieldDecorator('note', {
                    // rules: [{ required: true, message: '请输入备注！' }],
                })(
                    <Input placeholder="请输入备注" />
                    )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="积分值"
            >
                {getFieldDecorator('bonus_points', {
                    rules: [{ required: true, message: '请输入积分值！' }],
                })(
                    <InputNumber placeholder="请输入积分值！" min={0} />
                    )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="状态"
            >
                {getFieldDecorator('status', {
                    initialValue: "1",
                    rules: [{ required: true, message: '请输入' }],
                })(
                    <Select
                        style={{ width: 120 }}
                        showSearch={false}
                        placeholder="请输入"
                    >
                        <Option value="0">停用</Option>
                        <Option value="1">启用</Option>
                    </Select>
                )}
            </FormItem>
        </Modal>
    );
});

export default IntegralRulesDialog;