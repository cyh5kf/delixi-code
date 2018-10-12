import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Col, Row,Upload,Modal
} from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

import styles from './index.less';

import BraftEditor from 'braft-editor'

import braft from '../../../utils/braft.less'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import {getParam} from '@/utils/utils.js';


@connect(({ addOrEditWelfare,welfarePacketLists, loading }) => ({
    addOrEditWelfare,
    welfarePacketLists,
    loading: loading.models.addOrEditWelfare
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
        htmlContent: '',
        category:{},//商品分类
        fatherCategoryId:'1',//父类ID
        childIndex:0,//子类索引
        editId:getParam(window.location.href,'editId')
    }
    componentWillMount(){
        this.props.dispatch({//加载分类数据
            type: 'addOrEditWelfare/getCategory',
            payload: {
            },
        });

        this.props.dispatch({//加载用户等级列表
            type: 'addOrEditWelfare/getLevelPairs',
            payload: {
            },
        });
        const {
            editId
        }=this.state;

        if(editId){//加载表单数据 进行编辑
            this.props.dispatch({//加载用户等级列表
                type: 'addOrEditWelfare/getWelfareDetail',
                payload: {
                    id:editId
                },
            });
        }
    }
    componentWillReceiveProps(props){//设置分类索引
        const {
            addOrEditWelfare
        }=props;
        const category=addOrEditWelfare.category||{};
        const firstFatherId=Object.keys(category)[0];
        const children=category[firstFatherId] && category[firstFatherId].children||[];

        this.setState({
            category,
            // fatherCategoryId:firstFatherId,
            // childIndex:children.length ? 0:null
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {
            editId
        }=this.state;
        const { addOrEditWelfare } = this.props;
        const {
            welfareDetail={},//商品信息
        }=addOrEditWelfare;

        const {
            good={}
        }=welfareDetail||{}

        this.props.form.validateFieldsAndScroll((err, values) => {
            values.goods_detail=this.state.htmlContent;
            if (!err) {
                values.goods_type='1';//商品类型 1虚拟 2实物   目前全部传1

                if(editId){
                    values.id=editId;
                    values.goods_id=good.id;
                }
                this.props.dispatch({
                    type: 'addOrEditWelfare/addOrEdit',
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
    handleHTMLChange = (htmlContent) => {
        this.setState({ htmlContent })
    }
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
            type:'addOrEditWelfare/getCustomFields',
            payload: {
                cate_id
            },
        });
        this.setState({
            childIndex:props.index
        })

    }
    createFields(customFields){//生成输入框域
        const {
            formItemLayout
        }=this.state;
        const {
            getFieldDecorator,
            getFieldValue
        } = this.props.form;

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
                        radioValues.push(<Radio key={value} checked={value=='1'} value={value[0]+''}>{value[1]}</Radio>)
                    });
                    return <RadioGroup  onChange={(val,opt)=>{console.log(val);}}>
                        {radioValues}
                    </RadioGroup>

                }else if(input_type==4){
                    return  <Select style={{ width: 80 }}
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
                                                        }else {
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
        const { loading, addOrEditWelfare } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;


        const {
            formItemLayout,
            upLoad,
            category,//商品分类
            fatherCategoryId,//父类ID
            childIndex,//子类索引
            editId
        }=this.state;
        const pageTitle =!editId ? '添加福利礼包' : '编辑福利礼包';

        const {
            customFields=[],//商品分类填充字段
            levelPairs,//用户等级列表
            welfareDetail={},//商品信息
        }=addOrEditWelfare;


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


        //表单数据
        const {
            type='1',
            level='1',
            status='1',
            good={
                goods_detail:''
            },
        }=!editId?{}:welfareDetail;

        const editorProps = {
            height: 300,
            placeholder: '',
            contentFormat:'html',//用于指定initialContent和onChange的内容格式
            initialContent:good.goods_detail ,
            onHTMLChange: this.handleHTMLChange,
            viewWrapper: '.demo',
            controls:[
                'undo', 'redo', 'split', 'font-size', 'font-family', 'line-height', 'text-color',
                'bold', 'italic', 'underline', 'strike-through', 'superscript',
                'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
                'blockquote', 'code', 'split', 'link', 'split',
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
                        <FormItem label="福利名称"
                                  {...formItemLayout}>
                            {getFieldDecorator('type', {
                                initialValue: type,
                            })(
                                <Select  showSearch={false} >
                                    <Option value={'1'}>升级礼包</Option>
                                    <Option value={'2'}>生日礼包</Option>
                                    <Option value={'3'}>每月礼包</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="等级名称和等级限制">
                            {getFieldDecorator('level', {
                                initialValue:level ,
                                rules: [{
                                    required: true, message: '请选择等级名称',
                                }],
                            })(
                                <Select showSearch={false}>
                                    {levelOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="奖励类型"
                                  {...formItemLayout}>
                            {getFieldDecorator('cate_id', {
                                initialValue: good.cate_id||'3',
                            })(
                                <Select  showSearch={false}
                                         onChange ={(val,opt)=>{this.onCategoryChange(val,opt)}}>
                                    <Option value={'3'}>加息券</Option>
                                    <Option value={'2'}>红包</Option>
                                </Select>
                            )}
                        </FormItem>

                        {/*动态表单内容*/}
                        {this.createFields(editId&&getFieldValue('cate_id')==good.cate_id?good.attr||[]:customFields)}

                        <FormItem {...formItemLayout}
                                  label="状态">
                            {getFieldDecorator('status', {
                                initialValue:status,
                                rules: [{
                                    required: true, message: '请输入状态',
                                }],
                            })(
                                <Select style={{ width: 100 }}
                                        showSearch={false}>
                                    <Option value={'1'}>启用</Option>
                                    <Option value={'2'}>停用</Option>
                                </Select>
                            )}
                        </FormItem>

                        {/*<Row>*/}
                            {/*<Col xs={24} sm={7} className={styles.colLabel}>*/}
                                {/*福利礼包描述：*/}
                            {/*</Col>*/}
                            {/*<Col xs={24} sm={12} md={10}>*/}
                                {/*<div className="demo" style={{border:'1px solid #d9d9d9'}}>*/}
                                    {/*<BraftEditor {...editorProps} />*/}
                                {/*</div>*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
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
