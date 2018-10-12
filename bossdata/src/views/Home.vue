<template>
  <div class="content">
    <div class="selectWrap">
      <div class="selectContent">
        <select class="boderBy" v-model="orderBy" @change="boderChange">
          <option value="left_capital">按剩余本金排序</option>
          <option value="cash_total">按提现本金排序</option>
          <option value="left_income">按剩余收益排序</option>
          <option value="recharge_total">按充值本金排序</option>
          <option value="income_total">按累计收益排序</option>
        </select>

        <select class="sort" v-model="sort" @change="sortChange">
          <option value="asc">正序</option>
          <option value="desc">倒序</option>
        </select>
      </div>

      <div class="queryMobile">
        <input type="tel" v-model="regMobile" maxlength="11" placeholder="请输入手机号码">
        <div class="btn" @click="queryMobile">查询</div>
        <div class="btn" @click="clearMobile">清空</div>
      </div>

    </div>

    <div class="interval"></div>

    <div class="listContent">
      <div class="wrap" ref="bs0" v-show="lists.length">
        <div ref="wrap0" class="container" up="下拉刷新" down="上拉加载">
            <div class="listWraper" ref="listWraper">
              <table>
                  <thead>
                      <tr>
                          <th class="tLeft" align="left">姓名</th>
                          <th align="left">剩余本金(元)</th>
                          <th align="left">提现本金(元)</th>
                          <th class="tRight" align="right">剩余收益(元)</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in lists" :key="index">
                          <td class="tLeft underline" align="left" v-text="convertName(item.realName)" @click="openDialog(item)"></td>
                          <td align="left" v-text="residualPrincipal(item)"></td>
                          <td align="left" v-text="convert(item.cashTotal)"></td>
                          <td align="right" v-text="surplusIncome(item)"></td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
      </div>

      <div class="noData" v-show="!lists.length">暂无数据!</div>
    </div>


    <DialogTip :show="show" :massage="massage"></DialogTip>

    <VDialog :show="showDialog" :close="closeDialog">
      <div class="dialogContent">
        <p>
          <label>uid:</label>
          <span v-text="dialogObj.uid"></span>
          <router-link :to="'/nopayOrder?uid='+dialogObj.uid" style="margin-left: 0.6rem;">在途订单详情</router-link>
        </p>
        <p>
          <label>手机号码:</label>
          <span v-text="dialogObj.regMobile"></span>
        </p>
        <p>
          <label>姓名:</label>
          <span v-text="dialogObj.realName"></span>
        </p>
        <p>
          <label>剩余本金:</label>
          <span v-text="residualPrincipal(dialogObj)"></span>
        </p>
        <p>
          <label>提现本金:</label>
          <span v-text="convert(dialogObj.cashTotal)"></span>
        </p>
        <p>
          <label>剩余收益:</label>
          <span v-text="surplusIncome(dialogObj)"></span>
        </p>
        <p>
          <label>充值本金:</label>
          <span v-text="convert(dialogObj.rechargeTotal)"></span>
        </p>
        <p>
          <label>累计收益:</label>
          <span v-text="convert(dialogObj.incomeTotal)"></span>
        </p>
        <p>
          <label>待收收益:</label>
          <span v-text="convert(dialogObj.flowTotal)"></span>
        </p>
      </div>
    </VDialog>

    <Loading :show="showLoading" ></Loading>

  </div>
</template>

<script>
import { getLocalStorageItem, setLocalStorageItem, axiosRequest } from '@/assets/util.js'
import BScroll from 'better-scroll';
import DialogTip from '@/components/DialogTip'
import VDialog from '@/components/Dialog'
import Loading from '@/components/Loading'

export default {
  name: "home",
  data() {
    return {
      pageNum: 0,
      numPerPage: 15,
      totalPage: '',
      lists: [], // 列表数据
      orderBy: 'left_capital', // 按什么排序
      sort: 'asc', // 按正序倒序排序
      show: false, // 显示弹窗消息提示
      showDialog: false,  // 显示用户详细信息
      showLoading: false, //显示loading
      massage: '',  // 弹窗消息文本
      regMobile: '', // 查询手机号
      dialogObj: {
        uid: '',
        regMobile: '',
        realName: '',
        rechargeTotal: '',
        cashTotal: '',
        incomeTotal: '',
        flowTotal: '',
      }
    };
  },
  async created() {
    await this.loadData()
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
                      await this.loadData()
                    }
                    wrap.setAttribute('down', '下拉加载')
                    scroll.scrollTo(0, 0)
                }, 100)
            }
            if (diff - pos.y > 50) {
                if (this.pageNum < this.totalPage) {
                    if(!this.regMobile) {
                      await this.loadData()
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

    async loadData() {
      let params = {
        pageNum: this.pageNum + 1,
        numPerPage: this.numPerPage,
        token: getLocalStorageItem('token'),
        orderBy: this.orderBy,
        sort: this.sort,
      };
      const regMobile = this.regMobile;
      if(regMobile) {
        params.regMobile = regMobile;
      }
      this.showLoading = true;
      const data = await axiosRequest("apiApp/datanew/index.html", params, "post");
      this.showLoading = false;
      if(data.responseCode === '000000') {
        const obj = data.obj;
        this.totalPage = obj.totalPage;
        this.pageNum = obj.currentPage;
        this.lists = this.lists.concat(obj.recordList || []);
        this.$nextTick(() => {
            this.scroll && this.scroll.refresh()
        })
      } else {
          this.openMsg(data.responseMessage);
      }
    },

    queryMobile() {
        this.pageNum = 0;
        this.lists = [];
        this.loadData();
    },

    clearMobile() {
      this.regMobile = '';
    },

    boderChange(e) {
      const value = e.target.value;
      this.pageNum = 0
      this.lists = []
      this.regMobile = ''
      this.loadData();
    },

    sortChange(e) {
      const value = e.target.value;
      this.pageNum = 0
      this.lists = []
      this.regMobile = ''
      this.loadData();
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

    // 对名字进行加密
    convertName(name) {
      if(!name) {
        return
      }
      const len = name.length - 1;
      let xing = '';
      for (let i=0;i<len;i++) {
        xing+='*';
      }
      return name.substring(0, 1) + xing;
    },

    closeDialog() {
      this.showDialog = false;
      this.dialogObj = {
        uid: '',
        regMobile: '',
        realName: '',
        rechargeTotal: '',
        cashTotal: '',
        incomeTotal: '',
        flowTotal: '',
      }
    },

    openDialog(obj) {
      this.dialogObj = {
        uid: obj.uid,
        regMobile: obj.regMobile,
        realName: obj.realName,
        rechargeTotal: obj.rechargeTotal,
        cashTotal: obj.cashTotal,
        incomeTotal: obj.incomeTotal,
        flowTotal: obj.flowTotal,
      }
      this.showDialog = true;
    },

    //剩余本金计算，剩余本金 = 充值本金 - 提现本金，为负数则取零
    residualPrincipal(obj) {
      const { rechargeTotal, cashTotal } = obj;
      const result = rechargeTotal - cashTotal;
      return result > 0? this.convert(result): 0;
    },

    // 剩余收益 = 累计收益 + 在途收益 - 超额本金， 超额本金即充值本金-提现本金，如果结果为负数则要减去超额本金，正数不减
    surplusIncome(obj) {
      const { rechargeTotal, cashTotal, incomeTotal, flowTotal } = obj;
      const residualPrincipal = rechargeTotal - cashTotal;
      const chaoebenjin = residualPrincipal < 0? residualPrincipal: 0;
      return this.convert(incomeTotal + flowTotal + chaoebenjin);
    }

  },
  components: {
      DialogTip,
      VDialog,
      Loading
  }
}
</script>

<style lang="scss" scoped>

  @import "../assets/base.scss";

  .interval {
    width: 100%;
    height: .2rem;
    background-color: #f6f6f6;
  }

  .selectWrap {
    font-size: 0.24rem;
    padding: 0.3rem;

    .selectContent {
      overflow: hidden;
    }

    select {
      float: left;
      width: 2.5rem;
      height: 0.6rem;
      outline:none;
    }

    .sort {
      margin-left: 0.5rem;
    }
  }

  .queryMobile {
    margin-top: 0.3rem;

    input {
      width: 2rem;
      height: 0.6rem;
      border: 1px solid #e5e5e5;
      padding-left: 0.1rem;
      outline:none;
    }

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

  .listContent {
    padding-top: 0.2rem;
  }

  .wrap {
      overflow: hidden;
      font-size: 0.28rem;
      padding: 0.3rem;
      @include position((p:absolute, l:0, r:0, b:1.2rem, t: 2.2rem));
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
  }

  thead {
    tr {
      height: 0.4rem;
      color: #999;
      font-size: 0.26rem;
    }
  }

  tbody {
    tr {
      height: 0.82rem;
      color: #222;
      font-size: 0.28rem;
      border-bottom: 1px solid #e5e5e5;
    }

    tr:last-child {
      border-bottom: none;
    }
  }

  td {
    border: none;
    width: 25%;
  }

  .tLeft {
    width: 16%;
  }

  .underline {
    text-decoration:underline;
  }
  .tRight {
    width: 2.2rem;
  }

  .dialogContent {
    padding: 0.3rem;
    font-size: 0.3rem;
    color: #666;

    p {
      margin-bottom: 0.3rem;
      label {
        width: 1.6rem;
        display: inline-block;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
