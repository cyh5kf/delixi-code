<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left" :style="{ width: menuWidth}">
            <Menu :active-name="setActive" theme="dark" style="width: 100%;" @on-select="routeTo">
                <div class="layout-logo-left">
                    <h3>人众金服活动营销系统</h3>
                </div>
    
                <Menu-item name="part1">
                    <Icon type="home" :size="iconSize"></Icon>
                    <span class="layout-text">指定群组推送</span>
                </Menu-item>
    
            </Menu>
            </Col>
            <Col class="layout-right" :style="{ left: rightPosition}" >
            <div class="layout-header">
                <i-button type="text" @click="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </i-button>
                <div>
                    <span class="user_name">
                        <Icon type="person" size="20"></Icon>
                        <span v-text="username"></span>
                    </span>
                    <i-button type="text" @click="logOutClick" class="logOut">
                        <Icon type="power" size="20"></Icon>
                        <span>Logout</span>
                    </i-button>
                </div>
            </div>
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb-item>首页</Breadcrumb-item>
                    <Breadcrumb-item>{{pageName}}</Breadcrumb-item>
                </Breadcrumb>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">
                    <router-view></router-view>
                </div>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import localstorage from '../../store/localstorage';
import { logoutRequest } from '../../api/LoginApi';

export default {
    data() {
        return {
            spanLeft: 5,
            username: ''
        };
    },
    mounted() {
        this.username = localstorage.getUserName();

    },
    computed: {
        iconSize() {
            return this.spanLeft === 5 ? 14 : 24;
        },
        menuWidth() {
            return this.spanLeft === 5 ? '300px' : '100px';
        },
        rightPosition() {
            return this.spanLeft === 5 ? '300px' : '100px';
        },
        setActive() {
            return this.$route.path.replace('/home/','');
        },
        pageName() {
            const routerName = this.$route.path.replace('/home/','');
            if(routerName === 'part1') {
                return '步骤一';
            } else if(routerName === 'part2') {
                return '步骤二';
            } else if(routerName === 'part3') {
                return '步骤三';
            }
        }
    },
    methods: {
        toggleClick() {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
            } else {
                this.spanLeft = 5;
            }
        },
        routeTo(e) {
            // console.log(e);
            this.$router.push(e);
        },
        logOutClick() {
            this.$Modal.confirm({
                title: '退出 ?',
                content: '你确定要退出系统吗?',
                onOk: async() => {
                    const response = await logoutRequest();
                    if (response.status == 200) {
                        localstorage.removeItem('userName');
                        localstorage.removeItem('token');
                        localstorage.removeItem('queryData');
                        localstorage.removeItem('part3FormData');
                        localstorage.removeItem('interest');
                        localstorage.removeItem('userId');
                        localstorage.removeItem('queue');
                        this.$router.push('/login');
                        this.$Message.success('退出成功！');
                    }else {
                        this.$Message.error('退出失败！');
                    }
                    
                },
                onCancel: () => {
                }
            });
        }
    }
};
</script>
<style lang="less"  scoped>
.layout {
    min-width: 1200px;
    width: 100%;
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.ivu-row-flex {
    height: 100%;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 20px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
    overflow: auto;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
}

.layout-right {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 1;
    transition: left .3s;
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.logOut {
    font-size: 16px;
    margin-right: 15px;
}

.user_name {
    font-size: 16px;
    margin-right: 10px;  
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    line-height: 30px;
    color: #fff;
    text-align: center;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-hide-text .layout-text {
    display: none;
}

.layout-hide-text {
    .layout-logo-left {
        h3 {
            display: none;
        }
    }
}

.ivu-col {
    transition: width .2s ease-in-out;
}
</style>


