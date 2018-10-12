import { Row, Col, Card, Form, Input, Select, Radio, Icon, Button, Dropdown, InputNumber, Upload } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const EntityFormItems = (props) => {
    const { form, normFile, formItemLayout } = props;

    const { getFieldDecorator } = form;

    return (
        <>
            <FormItem
                {...formItemLayout}
                label="列表页图片"
            >
                {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" /> 导入图片
                        </Button>
                    </Upload>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="详情页页图片"
            >
                {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" /> 导入图片
                        </Button>
                    </Upload>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="H5封面图片"
            >
                {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" /> 导入图片
                        </Button>
                    </Upload>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="PC封面图片"
            >
                {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" /> 导入图片
                        </Button>
                    </Upload>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="状态"
            >
                {getFieldDecorator('title', {
                    initialValue: "0",
                    rules: [{
                        required: true, message: '请输入状态',
                    }],
                })(
                    <Select
                        style={{ width: 80 }}
                        showSearch={false}
                        placeholder="请输入"
                    >
                        <Option value="0">上架</Option>
                        <Option value="1">下架</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="市场价"
            >
                {getFieldDecorator('title', {
                    rules: [{
                        required: true, message: '请输入市场价',
                    }],
                })(
                    <InputNumber min={0} max={9999999} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="成本价"
            >
                {getFieldDecorator('title', {
                    rules: [{
                        required: true, message: '请输入成本价',
                    }],
                })(
                    <InputNumber min={0} max={9999999} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="是否热销"
            >
                {getFieldDecorator('public', {
                    initialValue: '0',
                })(
                    <Radio.Group>
                        <Radio value="0">是</Radio>
                        <Radio value="1">否</Radio>
                    </Radio.Group>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="所属用户组"
            >
                {getFieldDecorator('title', {
                    initialValue: "0",
                    rules: [{
                        required: true, message: '请选择',
                    }],
                })(
                    <Select
                        style={{ width: 100 }}
                        showSearch={false}
                        placeholder="请选择"
                    >
                        <Option value="0">所有用户</Option>
                        <Option value="1">V1</Option>
                        <Option value="2">V2</Option>
                        <Option value="3">V3</Option>
                        <Option value="4">V4</Option>
                        <Option value="5">V5</Option>
                        <Option value="6">V6</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品描述"
            >
              {getFieldDecorator('standard', {
                rules: [{
                  required: true, message: '请输入商品描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入商品描述" rows={4} />
              )}
            </FormItem>
        </>
    );
};

export default EntityFormItems;