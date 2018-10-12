import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Col, Row,Upload,Modal
} from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import EntityFormItems from './EntityFormItems';
import RateFormItems from './RateFormItems';
import RedPackFormItems from './RedPackFormItems';
import styles from './index.less';

import BraftEditor from 'braft-editor'

import 'braft-editor/dist/braft.css'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import {getParam} from '@/utils/utils.js';


@connect(({ addOrEditCommodity, loading }) => ({
    addOrEditCommodity,
    loading: loading.models.addOrEditCommodity
}))
@Form.create()
export default class BasicForms extends PureComponent {
    state={
        formItemLayout :{
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        },
        upLoad:[
            {
                previewVisible: false,
                previewImage: '',
                fileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
            }
        ],
        category:{},//商品分类
        fatherCategoryId:'1',//父类ID 1 或者 4
        childIndex:0,//子类索引
        editId:getParam(window.location.href,'editId'),
    }
    componentWillMount(){
        this.props.dispatch({//加载分类数据
            type: 'addOrEditCommodity/getCategory',
            payload: {
            },
        });

        this.props.dispatch({//加载用户等级列表
            type: 'addOrEditCommodity/getLevelPairs',
            payload: {
            },
        });
        const {
            editId
        }=this.state;

        if(editId){//加载表单数据 进行编辑
            this.props.dispatch({
                type: 'addOrEditCommodity/getCommodityDetail',
                payload: {
                    id:editId
                },
            });
        }
    }

    componentWillReceiveProps(props){//设置分类索引
        const {
            addOrEditCommodity
        }=props;
        const {
            editId
        }=this.state;
        const {
            category={},
            commodityDetail,//商品详情
        }=addOrEditCommodity;

        const firstFatherId=Object.keys(category)[0];
        const children=category[firstFatherId] && category[firstFatherId].children||[];

        // 手动给富文本编辑器赋值
        if(editId && commodityDetail) {
            const {
                goods_detail='',//商品详情
                wap_goods_detail='',//wap商品详情
            } = commodityDetail;
            this.editorInstance.setContent(goods_detail);
            this.editorInstanceWap.setContent(wap_goods_detail);
        }

        this.setState({
            category,
            // fatherCategoryId:commodityDetail.pid||firstFatherId,
            // childIndex:children.length ? 0:null
        });
    }

    // 保存表单
    handleSubmit = (e) => {
        e.preventDefault();
        const {
            editId
        }=this.state;

        this.props.form.validateFieldsAndScroll((err, values) => {
            //获取富文本框内容
            values.goods_detail= this.editorInstance.getContent();
            values.wap_goods_detail= this.editorInstanceWap.getContent();

            if (!err) {
                values.goods_type='1';//商品类型 1虚拟 2实物   目前全部传1

                if(editId){
                    values.id=editId
                }
                this.props.dispatch({
                    type: 'addOrEditCommodity/addOrEdit',
                    payload: values,
                });
            }
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    onCategoryChange(cate_id,option){//子类发生改变

        const {
            props
        }=option;

        this.props.dispatch({
            type:'addOrEditCommodity/getCustomFields',
            payload: {
                cate_id
            },
        });
        this.setState({
            childIndex:props.index
        })

    }
    onCategoryFatherChange(fatherCategoryId,option){//父类发生改变
        const {
            category
        }=this.state;

        this.setState({
            fatherCategoryId,
            childIndex:0
        });
        const categoryChildren=category[fatherCategoryId] && category[fatherCategoryId].children ||[];//array
        this.props.form.setFieldsValue({
            cate_id: categoryChildren.length && categoryChildren[0].id,
        });

        const {
            children=[]
        }=category[fatherCategoryId];

        this.props.dispatch({
            type:'addOrEditCommodity/getCustomFields',
            payload: {
                cate_id: children.length? children[0].id: null
            },
        });

        // setTimeout(()=>{
        //     this.setState({
        //         fatherCategoryId,
        //     });
        // },800)

        // this.props.dispatch({
        //     type:'addOrEditCommodity/saveFatherId',
        //     payload:{
        //         fatherCategoryId
        //     }
        // })
    }
    createFields(customFields){//生成输入框域
        const {
            formItemLayout
        }=this.state;
        const {
            getFieldDecorator,
            getFieldValue
        } = this.props.form;
        // debugger;
        const Items=[];
        for(let i=0;i<customFields.length;i++){
            const {
                attr_name,//字段描述
                attr_value='',//字符串或者Array 当input_type=5的时候是array
                mark,//字段key
                input_type,//录入方式 1文本 2多文本 3单选 4多选 5区间值
                select_value=[],//单选框的值
                is_required='0',//
                note,
            }=customFields[i];

            const fieldInputDom=()=>{
                const placeholder=`请输入${attr_name }`;

                if(input_type==2){
                    return  <TextArea style={{ minHeight: 32 }} placeholder={placeholder} rows={4} />
                }else if(input_type==3){
                    const radioValues=[];
                    select_value && select_value.map((value,i)=>{
                        radioValues.push(<Radio key={value}  value={value[0]+''}>{value[1]}</Radio>)
                    });
                    return <RadioGroup>
                        {radioValues}
                    </RadioGroup>

                }else if(input_type==4){
                    return <Select style={{ width: 80 }}
                                  showSearch={false}
                                  placeholder={placeholder}>
                        </Select>
                }else if(input_type==5){

                    return <Row type="flex" justify="start">
                        {(
                                <>
                                <Col style={{marginRight: '10px'}}>
                                    <FormItem >
                                        {getFieldDecorator(mark+'[0]', {
                                            initialValue:attr_value.length && attr_value[0] || 0,
                                            rules: [
                                                {required: true, message: `${attr_name}不能为空`,},
                                                {validator:(rule, value, callback) => {
                                                    const form = this.props.form;
                                                    const mark1Val=form.getFieldValue(mark+'[1]');
                                                    if(mark1Val >0){
                                                        if (value && value > mark1Val) {
                                                            callback('标的期限最小值不能大于最大值！');
                                                        } else {
                                                            callback();
                                                        }
                                                    }else {
                                                        callback();
                                                    }
                                                }}
                                            ],
                                        })(
                                            <InputNumber size={'260'} placeholder={placeholder} />
                                        )}
                                        <span>至</span>
                                    </FormItem>
                                </Col>
                                <Col>
                                    <FormItem >
                                        {getFieldDecorator(mark+'[1]', {
                                            initialValue:attr_value.length && attr_value[1] || 0,
                                            rules: [
                                                {required: true, message: `${attr_name}不能为空`},
                                                {validator:(rule, value, callback) => {
                                                    const form = this.props.form;
                                                    if (value*1 && value < form.getFieldValue(mark+'[0]')) {
                                                        callback('标的期限最大值不能小于最小值！');
                                                    } else {
                                                        callback();
                                                    }
                                                }}
                                            ],
                                        })(
                                            <InputNumber placeholder={placeholder} />
                                        )}
                                        <span>天</span>
                                    </FormItem>
                                </Col>
                                </>
                            )
                        }
                    </Row>
                }else{
                    return <Input placeholder={placeholder} />

                }
            }

            Items.push(<FormItem
                {...formItemLayout}
                label={attr_name}
                key={attr_name}>
                {input_type!=5 && getFieldDecorator(mark, {
                    initialValue:attr_value,
                    rules: [{
                        required: is_required=='1', message: `${attr_name}不能为空`,
                    }],
                })(
                    fieldInputDom()
                )}
                { input_type==5 && fieldInputDom()} {<span style={{color:"#999"}}>{note}</span>}
            </FormItem>)
        };
        return Items;
    }
    render() {
        const { loading, addOrEditCommodity } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {
            formItemLayout,
            upLoad,
            category,//商品分类
            fatherCategoryId,//父类ID
            childIndex,//子类索引
            editId
        }=this.state;
        const pageTitle =editId? '编辑商品' : '添加商品';
        const {
            customFields=[],//商品分类填充字段
            levelPairs,//用户等级列表
            commodityDetail={},//商品信息
            // fatherCategoryId,
            // cate_id,
        }=addOrEditCommodity;

        //表单数据
        const {
            goods_sn='',
            title='',
            change_integral='',
            note='',
            goods_num='',
            pid='1',//默认pid
            is_up='1',//状态  上下架
            market_price='',
            cost_price='',
            is_recommend='1',//是否热销
            level='0',//适用的用户等级
            goods_detail='',//商品详情
            wap_goods_detail='',//wap商品详情
            cate_id,//子类ID
            attr=[],//动态表单部分
            change_price='',//平台售价
        } = editId? commodityDetail: {};

        //分类列表options
        const categoryFatherOptions=[];
        const categoryFatherValues=Object.keys(category);

        categoryFatherValues.map((key,i)=>{
            const {
                cate_name
            }=category[key];

            categoryFatherOptions.push(<Option value={key} key={cate_name}>
                {cate_name}
            </Option>);
        });

        const categoryChildren=category[fatherCategoryId] && category[fatherCategoryId].children ||[];//array
        const categoryChildrenOptions=[];

        for(let i=0;i<categoryChildren.length;i++){
            const {
                cate_name,
                id
            }=categoryChildren[i];
            categoryChildrenOptions.push(<Option value={id} key={id} index={i}>
                {cate_name}
            </Option>);
        }
        //等级列表
        const levelOptions=[];
        levelOptions.push(<Option key="0" value={'0'}>所有用户</Option>);
        const levelKeys=Object.keys(levelPairs||{});

        levelKeys.map((key,i)=>{
            const text=levelPairs[key];
            levelOptions.push(<Option value={key} key={key} >
                {text}
            </Option>)
        });

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        const parentProps = {
            form: this.props.form,
            formItemLayout
        };

        const editorProps = {
            height: 300,
            placeholder: '',
            contentFormat: 'html',//用于指定initialContent和onChange的内容格式
            contentId: editId,
            initialContent: goods_detail,
            viewWrapper: '.demo',
            controls: [
                'undo', 'redo', 'split', 'font-size', 'font-family', 'line-height', 'text-color',
                'bold', 'italic', 'underline', 'strike-through', 'superscript',
                'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
                'blockquote', 'code', 'split', 'link', 'split', 'hr', 'clear'
                // 'media'
            ],
        }

        const editorPropsWap = {
            height: 300,
            placeholder: '',
            contentFormat: 'html',//用于指定initialContent和onChange的内容格式
            contentId: editId,
            initialContent: wap_goods_detail,
            viewWrapper: '.wap',
            controls: [
                'undo', 'redo', 'split', 'font-size', 'font-family', 'line-height', 'text-color',
                'bold', 'italic', 'underline', 'strike-through', 'superscript',
                'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
                'blockquote', 'code', 'split', 'link', 'split', 'hr', 'clear'
                // 'media'
            ],
        }


        return (
            <PageHeaderLayout title={pageTitle}>
                <Card bordered={false}>
                    <Form
                        onSubmit={this.handleSubmit}
                        hideRequiredMark
                        style={{ marginTop: 8 }}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="商品编码"
                        >
                            {getFieldDecorator('goods_sn', {
                                initialValue:goods_sn,
                                rules: [{
                                    required: true, message: '请输入商品编码',
                                }],
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品名称"
                        >
                            {getFieldDecorator('title', {
                                initialValue:title,
                                rules: [{
                                    required: true, message: '请输入商品名称',
                                }],
                            })(
                                <Input placeholder="请输入商品名称" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="所需积分"
                        >
                            {getFieldDecorator('change_integral', {
                                initialValue:change_integral,
                                rules: [{
                                    required: true, message: '请输入所需积分',
                                }],
                            })(
                                <InputNumber min={0}  />
                            )}
                        </FormItem>
                        {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="备注"*/}
                        {/*>*/}
                            {/*{getFieldDecorator('note', {*/}
                                {/*initialValue:note,*/}
                                {/*rules: [{*/}
                                    {/*required: true, message: '请输入备注',*/}
                                {/*}],*/}
                            {/*})(*/}
                                {/*<Input placeholder="请输入备注" />*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        <FormItem
                            {...formItemLayout}
                            label="商品库存"
                        >
                            {getFieldDecorator('goods_num', {
                                initialValue:goods_num,
                                rules: [{
                                    required: true, message: '请输入商品库存',
                                }],
                            })(
                                <InputNumber min={0} />
                            )}
                            <span> 商品为0，自动下架</span>
                        </FormItem>
                        {/*<Row>*/}
                            {/*<Col xs={24} sm={7} className={styles.colLabel}>*/}
                                {/*列表页图片：*/}
                            {/*</Col>*/}
                            {/*<Col xs={24} sm={12} md={10}>*/}
                                {/*<Upload*/}
                                    {/*action="//jsonplaceholder.typicode.com/posts/"*/}
                                    {/*listType="picture-card"*/}
                                    {/*fileList={upLoad[0].fileList}*/}
                                    {/*onPreview={()=>{this.handlePreview(0)}}*/}
                                    {/*onChange={()=>{this.handleChange(0)}}*/}
                                {/*>*/}
                                    {/*{upLoad[0].fileList.length >= 3 ? null : <div>*/}
                                        {/*<Icon type="plus" />*/}
                                        {/*<div className="ant-upload-text">点击上传</div>*/}
                                    {/*</div>}*/}
                                {/*</Upload>*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                        <Row>
                            <Col xs={24} sm={7} className={styles.colLabel}>
                                分类：
                            </Col>
                            <Col xs={24} sm={12} md={10}>
                                <Row type="flex" justify="start">
                                    <Col style={{ width: 120 }}>
                                        <FormItem
                                        >
                                            {getFieldDecorator('cate_id1', {
                                                initialValue:pid || categoryFatherValues.length && categoryFatherValues[0] ,
                                                rules: [{
                                                    required: true, message: '请输入分类',
                                                }],
                                            })(
                                                <Select style={{ width: 100 }}
                                                        showSearch={false}
                                                        onChange ={(val,opt)=>{this.onCategoryFatherChange(val,opt)}}>
                                                    {categoryFatherOptions}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    {
                                        categoryChildren.length  && (
                                            <Col style={{ width: 120 }}>
                                                <FormItem
                                                >
                                                    {getFieldDecorator('cate_id', {
                                                        initialValue:cate_id || categoryChildren.length && categoryChildren[childIndex] && categoryChildren[childIndex].id ,
                                                        rules: [{
                                                            required: true, message: '请输入分类',
                                                        }],
                                                    })(
                                                        <Select style={{ width: 100 }}
                                                                showSearch={false}
                                                                onChange ={(val,opt)=>{this.onCategoryChange(val,opt)}}>
                                                            {categoryChildrenOptions}
                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <FormItem {...formItemLayout}
                                  label="状态">
                            {getFieldDecorator('is_up', {
                                initialValue:is_up||'1' ,
                                rules: [{
                                    required: true, message: '请输入状态',
                                }],
                            })(
                                <Select style={{ width: 100 }}
                                        showSearch={false}>
                                    <Option value={'1'}>上架</Option>
                                    <Option value={'0'}>下架</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="市场价"
                        >
                            {getFieldDecorator('market_price', {
                                initialValue:market_price ,
                                rules: [{
                                    required: true, message: '请输入市场价',
                                }],
                            })(
                                <InputNumber  min={0} />
                            )}
                            <span>元</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="成本价"
                        >
                            {getFieldDecorator('cost_price', {
                                initialValue:cost_price ,
                                rules: [{
                                    required: true, message: '请输入成本价',
                                }],
                            })(
                                <InputNumber  min={0} />
                            )}
                            <span>元</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="平台售价"
                        >
                            {getFieldDecorator('change_price', {
                                initialValue:change_price ,
                                rules: [{
                                    required: true, message: '请输入平台售价',
                                }],
                            })(
                                <InputNumber  min={0} />
                            )}
                            <span>元</span>
                        </FormItem>
                        {/*动态表单内容*/}
                        {this.createFields(editId&&getFieldValue('cate_id')==cate_id?attr:customFields)}

                        <FormItem {...formItemLayout}
                                  label="是否热销">
                            {getFieldDecorator('is_recommend', {
                                initialValue:is_recommend||'1' ,
                                rules: [{
                                    required: true, message: '请勾选热销类型',
                                }],
                            })(
                                <RadioGroup>
                                    <Radio  value={'1'}>是</Radio>
                                    <Radio  value={'0'}>否</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout}
                                  label="所属用户组">
                            {getFieldDecorator('level', {
                                initialValue:level||'0' ,
                                rules: [{
                                    required: true, message: '请选择用户组',
                                }],
                            })(
                                <Select style={{ width: 100 }}
                                        showSearch={false}>
                                    {levelOptions}
                                </Select>
                            )}
                        </FormItem>

                        <Row>
                            <Col xs={24} sm={7} className={styles.colLabel}>
                                PC端商品描述：
                            </Col>
                            <Col xs={24} sm={12} md={12}>
                                <div className="demo" style={{border:'1px solid #d9d9d9'}}>
                                    <BraftEditor ref={instance => this.editorInstance = instance} {...editorProps} />
                                </div>
                            </Col>
                        </Row>

                        <Row style={{marginTop:'25px'}}>
                            <Col xs={24} sm={7} className={styles.colLabel}>
                                wap端商品描述：
                            </Col>
                            <Col xs={24} sm={12} md={12}>
                                <div className="wap" style={{border:'1px solid #d9d9d9'}}>
                                    <BraftEditor ref={instance => this.editorInstanceWap = instance} {...editorPropsWap} />
                                </div>
                            </Col>
                        </Row>

                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}
