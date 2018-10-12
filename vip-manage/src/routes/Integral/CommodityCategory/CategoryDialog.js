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
    message
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const CategoryDialog = Form.create(
    {
        mapPropsToFields(props) {
            return {
                cate_name: Form.createFormField({
                    ...props.cate_name,
                    value: props.cate_name.value,
                }),
                note: Form.createFormField({
                    ...props.note,
                    value: props.note.value,
                }),
                rank: Form.createFormField({
                    ...props.rank,
                    value: props.rank.value,
                }),
                up_id: Form.createFormField({
                    ...props.up_id,
                    value: props.up_id.value,
                }),
                id: Form.createFormField({
                    ...props.id,
                    value: props.id.value,
                }),
                status: Form.createFormField({
                    ...props.status,
                    value: props.status.value,
                }),
            };
        },
    }
)((props) => {
    const {modalVisible, form, handleAdd, handleModalVisible,tree={},up_id} = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            if(!!props.id.value){
                fieldsValue.id = props.id.value;
                handleAdd(false, fieldsValue);
            }else{
                handleAdd(true, fieldsValue);
            }

        });
    };
    const father=[];
    const treeData={};
    for(let key in tree){
        father.push({cate_name:tree[key].cate_name,id:tree[key].id});
        treeData[tree[key].id]=tree[key].children;
    }
    const {getFieldDecorator} = form;
    const fatherOption=father.map(item=><Option key={item.id} value={item.id}>{item.cate_name}</Option>);
    // const treeOptionData=treeData[up_id.value]||treeData[1]||[];
    // const treeOption=treeOptionData.map(item=><Option key={item.id} value={item.id}>{item.cate_name}</Option>)

    return (
        <Modal
            title="添加/编辑商品类别"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            okText="保存"
        >
            <FormItem labelCol={{span: 5}}
                      wrapperCol={{span: 15}}
                      label="上级分类">
                {getFieldDecorator('up_id', {
                    rules: [{required: true, message: '请输入类别名称'}],
                })(
                    <Select
                        style={{width: 120}}
                        showSearch={false}
                        placeholder="请输入"
                    >
                        <Option value='0'>顶级分类</Option>
                        {fatherOption}
                    </Select>
                )}
            </FormItem>
            <FormItem
                labelCol={{span: 5}}
                wrapperCol={{span: 15}}
                label="排序"
            >
                {getFieldDecorator('rank', {
                    rules: [{required: true, message: '请输入排序！'}],
                })(
                    <Input placeholder="请输入排序"/>
                )}
            </FormItem>
            <FormItem
                labelCol={{span: 5}}
                wrapperCol={{span: 15}}
                label="分类名称"
            >
                {getFieldDecorator('cate_name', {
                    rules: [{required: true, message: '请输入分类名称！'}],
                })(
                    <Input placeholder="请输入分类名称"/>
                )}
            </FormItem>
            <FormItem labelCol={{span: 5}}
                      wrapperCol={{span: 15}}
                      label="状态">
                {getFieldDecorator('status', {
                    rules: [{required: true, message: '请选择状态'}],
                })(
                    <Select
                        style={{width: 120}}
                        showSearch={false}
                        placeholder="请选择状态"
                    >
                        <Option value='1'>启用</Option>
                        <Option value='2'>停用</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                labelCol={{span: 5}}
                wrapperCol={{span: 15}}
                label="备注"
            >
                {getFieldDecorator('note', {
                    // rules: [{
                    //     required: true, message: '请输入备注',
                    // }],
                })(
                    <TextArea style={{minHeight: 32}} placeholder="请输入备注" rows={4}/>
                )}
            </FormItem>

        </Modal>
    );
});

export default CategoryDialog;