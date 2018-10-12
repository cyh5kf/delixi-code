<template>
  <div class="content">
    <!-- <div class="interval"></div> -->

    <div class="listContent">
      <div class="wrap" ref="bs0" v-show="lists.length">
        <div ref="wrap0" class="container" up="下拉刷新" down="上拉加载">
            <div class="listWraper" ref="listWraper">
              <table>
                  <thead>
                      <tr>
                          <th class="tLeft" align="left">订单号</th>
                          <th align="left" style="padding-left: 0.1rem;">本金(元)</th>
                          <th align="left">利息(元)</th>
                          <th align="left">开始时间</th>
                          <th class="tRight" align="right">结束时间</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in lists" :key="index">
                          <td class="tLeft" align="left" v-text="sub(item.trxId)"></td>
                          <td align="left" style="padding-left: 0.1rem;" v-text="convert(item.money)"></td>
                          <td align="left" v-text="convert(item.interest)"></td>
                          <td align="left" v-text="formatTime(item.createTime)"></td>
                          <td align="right" v-text="formatTime(item.repaymentTime)"></td>
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

  </div>
</template>

<script>
import { getLocalStorageItem, setLocalStorageItem, axiosRequest, getParam, formartDate } from '@/assets/util.js'
import BScroll from 'better-scroll';
import DialogTip from '@/components/DialogTip'
import Loading from '@/components/Loading'

export default {
  name: "home",
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
      const uid = getParam(window.location.href,'uid');
      let params = {
        pageNum: this.pageNum + 1,
        numPerPage: this.numPerPage,
        token: getLocalStorageItem('token'),
        uid
      };
      this.showLoading = true;
      const data = await axiosRequest("apiApp/datanew/queryNoRepay.html", params, "post");
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
    }

  },
  components: {
      DialogTip,
      Loading
  }
}
</script>

<style lang="scss" scoped>

  @import "../assets/base.scss";

  .wrap {
      overflow: hidden;
      font-size: 0.28rem;
      padding: 0.3rem 0.15rem 0.3rem;
      @include position((p:absolute, l:0, r:0, b:1.2rem, t: 0rem));
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
      font-size: 0.24rem;
    }
  }

  tbody {
    tr {
      height: 0.82rem;
      color: #222;
      font-size: 0.24rem;
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
    width: 2.4rem;
  }

  .underline {
    text-decoration:underline;
  }
  .tRight {
    width: 2.2rem;
  }
</style>
