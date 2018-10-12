import React, { PureComponent } from 'react';
import {
    Input,
    message,
    Icon
} from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class SelectMultiple extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            optionsArray: [],
            isShow: false // 是否显示下拉菜单
        }
    }

    componentDidMount() {
        const props = this.props;
        const optionsArray = this.getOptionsArray(props);
        this.setState({optionsArray});
        const _this = this;
        document.addEventListener('click',_this.clickHide
        , false)
        window.addEventListener('resize',_this.clickHide);
    }

    componentWillReceiveProps(nextProps) {
        const optionsArray = this.getOptionsArray(nextProps);
        this.setState({optionsArray});
    }

    componentWillUnmount() {
        const _this = this;
        document.removeEventListener('click',_this.clickHide, false)
        window.removeEventListener('resize',_this.clickHide)
    }

    // 点击页面隐藏下拉菜单
    clickHide = () => {
        const dropdown = document.querySelector('.ant-select-dropdown');
        if(dropdown) {
           dropdown.setAttribute("class","ant-select-dropdown ant-select-dropdown--multiple ant-select-dropdown-placement-bottomLeft ant-select-dropdown-hidden");
           this.setState({ isShow: false });
        }
    }

    // 点击下拉菜单区域，阻止冒泡，不隐藏
    onClickDropdown(e) {
        e.nativeEvent.stopImmediatePropagation();
    }

    // 点击下单菜单中的选项
    onChangeSelect(key, selected, index, arr) {
        let cardArray = [];
        let { optionsArray } = this.state;
        for(let i of arr) {
            if(i.selected) {
               cardArray.push(i.key); 
            }
        }
        
        if(!selected) {
            cardArray.push(key);
            optionsArray[index].selected = true;
        } else {
            const cardArrayLength = cardArray.length;
            if(cardArrayLength === 1) {
              message.warning('至少要保留一个选项！');
              return false;
            }

            cardArray = cardArray.filter((item, index) => {
                return item !== key;
            })
            optionsArray[index].selected = false;
        }
        this.setState({optionsArray});
        this.props.onChange(cardArray);
    }

    // 打开下拉菜单
    openOptions = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        const dropdown = document.querySelector('.ant-select-dropdown');
        dropdown.setAttribute("class","ant-select-dropdown ant-select-dropdown--multiple ant-select-dropdown-placement-bottomLeft");
        this.setState({ isShow: true });
    }

    // 获取下拉菜单的选项数组
    getOptionsArray = (props) => {
        const { value, children } = props;
        const optionsArray = [];
        for(let i=0; i<children.length; i++) {
            for(let j=0; j<value.length; j++) {
                if(children[i].key === value[j]) {
                    optionsArray.push({key: children[i].key, text: children[i].props.children, selected: true});
                    break;
                } else if(j === value.length-1) {
                    optionsArray.push({key: children[i].key, text: children[i].props.children, selected: false});
                }
            }
        }
        return optionsArray;
    }

    render() {
        const { value, children, style } = this.props;
        const { optionsArray, isShow } = this.state;
        
        let firstSelected = '';
        // 获取第一个选中的选项
        for(let i of optionsArray) {
            if(i.selected) {
                firstSelected = i.text;
                break;
            }
        }

        const suffix = <Icon type={isShow? 'up': 'down' } />;

        return (
            <div className={ styles.selectMultiple }>
                <Input value={firstSelected} onClick={this.openOptions} style={style} suffix={suffix} />
                <div className="ant-select-dropdown ant-select-dropdown--multiple ant-select-dropdown-placement-bottomLeft ant-select-dropdown-hidden" onClick={this.onClickDropdown} style={{ position: 'static', width: style.width, left: 'initial', right: 'initial', top: 'initial', marginTop: '36px' }}>
                    <div style={{overflow: 'auto'}}>
                        <ul className="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" role="menu">
                            {
                                optionsArray.map((item, index, arr) => {
                                    const selected = item.selected;
                                    const cls = classNames(
                                    'ant-select-dropdown-menu-item',
                                    {'ant-select-dropdown-menu-item-selected': selected}
                                    )
                                    return (
                                        <li key={item.key} className={cls} onClick={() => this.onChangeSelect(item.key, item.selected, index, arr)}>{item.text}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
