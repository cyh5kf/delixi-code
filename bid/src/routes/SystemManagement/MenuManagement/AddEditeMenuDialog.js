import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const AddEditeMenuDialog = Form.create()(props => {
  const { form, handleAdd, handleEdit, handleModalVisible, dialogTitle='add', id, name, parentId, href, remark } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if(dialogTitle === 'add') {
        handleAdd(fieldsValue);
      } else {
        fieldsValue.id = id;
        handleEdit(fieldsValue);
      }
      
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Modal
      title={dialogTitle === 'add'? '添加菜单': '编辑菜单'}
      visible={true}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      okText="保存"
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名称">
        {getFieldDecorator('name', {
          initialValue: name,
          rules: [{ required: true, message: '请输入菜单名称！' }],
        })(<Input placeholder="请输入菜单名称" />)}
      </FormItem>
      {
        parentId !== 0? (
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父级Id">
            {getFieldDecorator('parentId', {
              initialValue: parentId,
              // rules: [{ required: true, message: '请输入父级Id！' }],
            })(<Input disabled={true} />)}
          </FormItem>
        ): null
      }
      {
        parentId !== 0? (
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="链接地址">
            {getFieldDecorator('href', {
              initialValue: href,
              rules: [{ required: true, message: '请输入链接地址！' }],
            })(<Input placeholder="请输入链接地址！" />)}
          </FormItem>
        ): null
      }
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否菜单">
        {getFieldDecorator('menu', {
          initialValue: '1',
        })(
          <Input disabled={true} />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {getFieldDecorator('remark', {
          initialValue: remark,
          rules: [{ required: true, message: '请输入备注！' }],
        })(<TextArea placeholder="请输入备注！" rows={4} />)}
      </FormItem>
    </Modal>
  );
});

export default AddEditeMenuDialog;
