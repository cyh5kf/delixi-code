import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Col, Row, Modal
} from 'antd';
import moment from 'moment';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import EntityFormItems from './EntityFormItems';
import RateFormItems from './RateFormItems';
import RedPackFormItems from './RedPackFormItems';
import styles from './index.less';
import {getParam} from '@/utils/utils.js'

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(({commodityDetail, loading}) => ({
    commodityDetail,
    loading: loading.models.commodityDetail,
}))
@Form.create()
export default class CommodityDetail extends PureComponent {
    // state = {
    //     id: getParam(window.location.href,'id')
    // }

    // componentDidMount() {
    //     const {dispatch} = this.props;
    //     dispatch({
    //         type: 'commodityDetail/detail',
    //         payload: {id: this.state.id}
    //     })
    // }
    render(){
        return (<div></div>)
    }
    // render() {
    //     const {commodityDetail:{detail={attr:[]}}} = this.props;
    //     const {getFieldDecorator, getFieldValue} = this.props.form;
    //     const formItemLayout = {
    //         labelCol: {
    //             xs: {span: 24},
    //             sm: {span: 7},
    //         },
    //         wrapperCol: {
    //             xs: {span: 24},
    //             sm: {span: 12},
    //             md: {span: 10},
    //         },
    //     };
    //     const submitFormLayout = {
    //         wrapperCol: {
    //             xs: {span: 24, offset: 0},
    //             sm: {span: 10, offset: 7},
    //         },
    //     };
    //     const {
    //         title,//商品名称
    //         cate_name,//分类名称
    //         level_name,//用户组
    //         goods_type,//商品类型 1虚拟 2实物
    //         change_integral,//兑换积分
    //         attr,
    //         is_up,//是否上架
    //         change_price,//售价
    //         cost_price,//成本价
    //         change_num,//销量
    //         is_recommend,//是否热销
    //         goods_num,//库存
    //         create_time,//添加时间
    //         update_time,//更新时间
    //     }=detail;
    //     const goodsDetail=attr.map((v,i)=>{
    //         if(typeof v.attr_value=='object'){
    //             return <FormItem
    //                 key={i}
    //                 {...formItemLayout}
    //                 label={v.attr_name}
    //             >
    //                 <span>{v.attr_value[0]+'~'+v.attr_value[1]+'天'}</span>
    //             </FormItem>
    //         }else{
    //             return <FormItem
    //                 key={i}
    //                 {...formItemLayout}
    //                 label={v.attr_name}
    //             >
    //                 <span>{v.input_type=='3'?v.attr_text:v.attr_value}</span>
    //             </FormItem>
    //         }
    //     })
    //     return (
    //         <PageHeaderLayout title="商品管理">
    //             <Card bordered={false}>
    //                 <Form
    //                     onSubmit={this.handleSubmit}
    //                     hideRequiredMark
    //                     style={{marginTop: 8}}
    //                 >
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="商品名称"
    //                     >
    //                         <span>{title}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="分类"
    //                     >
    //                         <span>{cate_name}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="积分值"
    //                     >
    //                         <span>{change_integral}</span>
    //                     </FormItem>
    //                     {goodsDetail}
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="状态"
    //                     >
    //                         <span>{is_up==1?'上架':'下架'}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="平台售价（元）"
    //                     >
    //                         <span>{change_price}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="成本价（元）"
    //                     >
    //                         <span>{cost_price}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="销量"
    //                     >
    //                         <span>{change_num}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="是否热销"
    //                     >
    //                         <span>{is_recommend==1?'是':'否'}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="所属用户组"
    //                     >
    //                         <span>{level_name}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="库存"
    //                     >
    //                         <span>{goods_num}</span>
    //                     </FormItem>
    //                     <FormItem
    //                         {...formItemLayout}
    //                         label="添加时间"
    //                     >
    //                         <span>{create_time }</span>
    //                     </FormItem>
    //                     <FormItem {...submitFormLayout} style={{marginTop: 32}}>
    //                     </FormItem>
    //                 </Form>
    //             </Card>
    //         </PageHeaderLayout>
    //     );
    // }
}


