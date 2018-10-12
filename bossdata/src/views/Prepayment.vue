<template>
  <div class="content">
    <!-- <div class="interval"></div> -->
    <div class="form">
        <div class="item_container">
            <div class="item"><span class="title">开始时间:</span><input type="date" ref="startTime" @change="onChangeStartTime" :value="startTime"/></div>
            <div class="item"><span class="title">结束时间:</span><input type="date"  ref="endTime" @change="onChangeEndTime" :value="endTime"/></div>
            <div class="item"><span class="title">手机号码:</span><input type="tel"  ref="regMobile" @change="onChangePhone" :value="regMobile" maxlength="11"/></div>
            <div class="item"><span class="title">用户ID:</span><input type="text"  ref="uid" @change="onChangeUid" :value="uid"/></div>
        </div>
        <div class="button_group">
            <div class="btn" @click="()=>findPrepaymentList(1)">查询</div>
        </div>
    </div>
    <div class="listContent">
      <div class="wrap" ref="bs0" v-show="lists.length">
        <div ref="wrap0" class="container" up="下拉刷新" down="上拉加载">
            <div class="listWraper" ref="listWraper">
              <table>
                  <thead>
                      <tr>
                          <th class="tLeft" align="left">姓名</th>
                          <th align="left" style="padding-left: 0.1rem;">手机号</th>
                          <th align="left">金额</th>
                          <th align="left">还款日期</th>
                          <th class="tRight" align="right">提前天数</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in lists" :key="index" @click="()=>openDialog(index)">
                          <td class="tLeft" align="left" v-text="sub(item.userName)"></td>
                          <td align="left" style="padding-left: 0.1rem;" v-text="item.phone"></td>
                          <td align="left" v-text="convert(item.amount)"></td>
                          <td align="left" v-text="formatTime(item.yesTimeStr)"></td>
                          <td align="right" v-text="item.advanceDays"></td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
      </div>

      <div class="noData" v-show="!lists.length">暂无数据!</div>
    </div>

    <DialogTip :show="show" :massage="massage"></DialogTip>

    <Loading :show="showLoading" ></Loading>
      <VDialog :show="showDialog" :close="closeDialog"><PrepaymentDetail :data="detail"/></VDialog>

  </div>
</template>

<script>
import { getLocalStorageItem, setLocalStorageItem, axiosRequest, getParam, formartDate } from '@/assets/util.js'
import BScroll from 'better-scroll';
import DialogTip from '@/components/DialogTip'
import Loading from '@/components/Loading'
import VDialog from '@/components/Dialog'
import PrepaymentDetail from '@/views/PrepaymentDetail';

export default {
  name: "prepayment",
  data() {
    return {
      pageNum: 0,
      numPerPage: 10,
      totalPage: '',
      lists: [], // 列表数据
      orderBy: 'left_capital', // 按什么排序
      sort: 'asc', // 按正序倒序排序
      show: false, // 显示弹窗消息提示
      showLoading: false, //显示loading
      massage: '',  // 弹窗消息文本
      regMobile: '', // 查询手机号
      uid:'',
      showDialog: false,
      startTime: new Date().Format('yyyy-MM-dd'),
      endTime: new Date(new Date().getTime() + 24*60*60*1000).Format('yyyy-MM-dd'),
      detail:{}
    };
  },
  async created() {
    await this.findPrepaymentList(1)
  },
  mounted() {
    this.$nextTick(() => {
        this.createScroll()
    })
    const bs = this.$refs.bs0
    const listWraper = this.$refs.listWraper
    listWraper.style.minHeight = bs.getBoundingClientRect().height + 'px'
  },
  methods: {
      createScroll(){
        const bs = this.$refs.bs0
        const scroll = this.scroll = new BScroll(bs, {
            click: true,
            preventDefault: true
        })
        const wrap = this.$refs.wrap0
        let diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
        this.scroll.on('touchend', async (pos) => {
            diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
            if (pos.y > 50) {
                wrap.setAttribute('up', '刷新中')

                this.pageNum = 0
                setTimeout(async () => {
                    scroll.scrollTo(0, 50)
                    this.lists = []
                    if(!this.regMobile) {
                      await this.findPrepaymentList(this.pageNum)
                    }
                    wrap.setAttribute('down', '下拉加载')
                    scroll.scrollTo(0, 0)
                }, 100)
            }
            if (diff - pos.y > 50) {
                if (this.pageNum < this.totalPage) {
                    if(!this.regMobile) {
                      await this.findPrepaymentList()
                    }
                    this.$nextTick(() => {
                        scroll.refresh()
                        diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                    })
                } else {
                    wrap.setAttribute('down', '已全部加载')
                }
            }
        })
    },

    async loadData(params) {
      // const uid = getParam(window.location.href,'uid');
      // let params = {
      //   currPage: this.pageNum + 1,
      //   pageSize: this.numPerPage,
      //   token: getLocalStorageItem('token'),
      //   phone:this.regMobile,
      //   userId:this.uid,
      //   startTime:this.startTime,
      //   endTime:this.endTime
      // };
      this.showLoading = true;
      const data = await axiosRequest("/apiApp/datanew/queryUserAdanveList.html", params, "post");
      this.showLoading = false;
      if(data.responseCode === '000000') {
        const obj = JSON.parse(data.obj);
        this.totalPage = obj.totalPage;
        this.pageNum = obj.currPage;
        if(obj.currPage == 1){
            this.lists = obj.data
        } else {
            this.lists = this.lists.concat(obj.data || []);
        }

        this.$nextTick(() => {
            this.scroll && this.scroll.refresh()
        })
      } else {
          this.openMsg(data.responseMessage);
      }
    },

    openMsg(msg) {
      this.show = true;
      this.massage = msg;
      setTimeout(() => {
          this.show = false;
          this.massage = '';
      }, 2000);
    },

    // 格式化保留两位小数并转换成千分位
    convert(num) {
      if(num === 0) {
        return 0;
      } else if(num) {
        const regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
        return (num*1).toFixed(2).toString().replace(regExpInfo, "$1,");
      } else {
        return ''
      }
    },

    formatTime(time) {
      return formartDate(time);
    },

    sub(order) {
      return order? order.substring(order.length-6): '';
    },
  // 开始时间
  onChangeStartTime(){
      this.startTime = this.$refs.startTime.value;
  },
  // 结束时间
  onChangeEndTime(){
      this.endTime = this.$refs.endTime.value;
  },
  // 手机号码
  onChangePhone(){
      this.regMobile = this.$refs.regMobile.value;
  },
  // uid
  onChangeUid(){
      this.uid = this.$refs.uid.value;
  },
  // 查找列表
  findPrepaymentList(pageNum){
      let params = {
          currPage: pageNum || this.pageNum + 1,
          pageSize: this.numPerPage,
          token: getLocalStorageItem('token'),
          phone:this.regMobile,
          userId:this.uid,
          startTime:this.startTime,
          endTime:this.endTime
      };
      this.loadData(params)
  },
  // 查找详情
  findDetailByUserId(index){
      this.detail = this.lists[index]
  },
  openDialog(userId){
      this.showDialog = true;
      this.findDetailByUserId(userId)
  },
  closeDialog(){
      this.showDialog = false
  },

  },
  components: {
      DialogTip,
      Loading,
      VDialog,
      PrepaymentDetail
  }
}
</script>

<style lang="scss" scoped>

  @import "../assets/base.scss";

  .form{
      width: 100%;
      display: flex;
      height: 2.4rem;
      border-bottom: 1px solid #e5e5e5;
      .item_container{
          width: 70%;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          .item{
              font-size: 0.24rem;
              width: 100%;
              margin-left: 0.5rem;
              height: 1rem;
              display: flex;
              align-items: center;
              .title{
                  height: 1rem;
                  display: flex;
                  align-items: center;
                  width: 1.2rem;
                  justify-content: flex-end;
              }
              input{
                  font-size: 0.24rem;
                  margin-left: 0.2rem;
                  flex: 1;
                  margin-right: 0.8rem;
                  border: 1px solid #e5e5e5;
                  height: 50%;
              }
          }
          /*.endTime{*/
              /*font-size: 0.24rem;*/
              /*width: 100%;*/
              /*margin-left: 0.5rem;*/
              /*height: 1rem;*/
              /*display: flex;*/
              /*align-items: center;*/
              /*.ed_label{*/
                  /*height: 1rem;*/
                  /*display: flex;*/
                  /*align-items: center;*/
              /*}*/
              /*input{*/
                  /*font-size: 0.24rem;*/
                  /*margin-left: 0.2rem;*/
                  /*flex: 1;*/
                  /*margin-right: 0.8rem;*/
              /*}*/
          /*}*/
          /*.tel{*/
              /*font-size: 0.24rem;*/
              /*width: 100%;*/
              /*margin-left: 0.5rem;*/
              /*height: 1rem;*/
              /*display: flex;*/
              /*align-items: center;*/
              /*.tel_label{*/
                  /*height: 1rem;*/
                  /*display: flex;*/
                  /*align-items: center;*/
              /*}*/
              /*input{*/
                  /*font-size: 0.24rem;*/
                  /*margin-left: 0.2rem;*/
                  /*flex: 1;*/
                  /*margin-right: 0.8rem;*/
                  /*border: 1px solid #e5e5e5;*/
              /*}*/
          /*}*/
      }
      .button_group{
          display: flex;
          align-items: center;
          justify-content: center;
          .btn {
              width: 1.6rem;
              height: 0.6rem;
              line-height: 0.6rem;
              background-color: #5569cc;
              border-radius: 4px;
              font-size: .28rem;
              color: #f0f0f9;
              text-align: center;
              margin-left: .28rem;
              display: inline-block;
          }
      }
  }
  .wrap {
      overflow: hidden;
      font-size: 0.28rem;
      padding: 0.3rem 0.15rem 0.3rem;
      @include position((p:absolute, l:0, r:0, b:0, t: 2.2rem));
      .container {
          position: relative;
          $beforeAfterH: 0.5rem;
          &:before {
              content: attr(up);
              @include position((p:absolute, l:0, t:-0.7rem, z:10));
              @include box((w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH))
          }
          &:after {
              content: attr(down);
              @include box((d:block, w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH));
              position: absolute;
          }
      }
  }

  .noData {
    font-size: 0.28rem;
    text-align: center;
  }
  table {
    border: none;
    width: 100%;
    border-spacing: 0;
  }

  thead {
    tr {
      height: 0.4rem;
      color: #999;
      font-size: 0.24rem;
        th{
            text-align: center;
        }
    }
  }

  tbody {
    tr {
      height: 0.82rem;
      color: #222;
      font-size: 0.24rem;
      border-bottom: 1px solid #e5e5e5;
      td[align="right"]{
        width: 15%;
      }
    }
    tr:nth-of-type(odd){
      background: #e5e5e5;
    }
      .tLeft{
          text-decoration: underline;
          color: #4992ec;
      }

    tr:last-child {
      border-bottom: none;
    }
  }

  td {
    border: none;
      text-align: center;
    /*width: 25%;*/
  }

  .tLeft {
    /*width: 2.4rem;*/
  }

  .underline {
    text-decoration:underline;
  }
  .tRight {
    width: 2.2rem;
  }
</style>
