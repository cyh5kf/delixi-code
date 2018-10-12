<template>
    <div>
        <div class="current">
            <p class="title">本月回款(元)</p>
            <p class="all" v-text="(principalCount*1+interestCount*1).toLocaleString()">0.00</p>
            <div class="desc">
                <p><span class="dotBlue"></span>本金<span v-text="(principalCount*1).toLocaleString()">0.00</span></p>
                <p><span class="dotRed"></span>收益<span v-text="(interestCount*1).toLocaleString()">0.00</span></p>
            </div>
        </div>
        <div class="head">
            <div class="prev_gray" @click="prev_month"></div>
            <div class="month" v-html="`${this.now[0]}年<i class='red'>${this.now[1]}</i>月`"></div>
            <div class="next" @click="next_month"></div>
        </div>
        <div class="calendar">
            <div class="week">
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
            <div class="day">
                <div v-for="(item,index) in days">
                    <p v-show="index-first+1>0"
                       :tip="tip[index-first+1]?tip[index-first+1].length:''"
                       v-text="item.val"
                       :class="[check_day === index ? 'check_day': '',item.color,item.tip]"
                       @click="seeDetail(index)"></p>
                </div>
            </div>
        </div>
        <div class="list" v-if="list">
            <div class="title" v-html="`${now[0]}年${now[1]}月${check_day-first+1}日，共<span style='color:#5a9aed;padding: 0 0.1rem'>${list.length}</span>笔回款`"></div>
            <div class="detail"
                 v-for="(item,index) in list">
                <div class="name">
                    <p v-text="item.borrowName"></p>
                    <p>第<span v-text="item.period"></span>期回款金额(元)</p>
                </div>
                <div class="money">
                    <span v-show="item.capital">
                        本金<i v-text="(item.capital*1).toLocaleString()"></i>
                        <span class="add"></span>
                    </span>
                    收益<i v-text="(item.interest*1).toLocaleString()"></i>
                </div>
            </div>
        </div>
        <div class="list" v-if="!list">
            <div class="unTitle">今日无回款</div>
            <div class="nextDate" v-show="nextDate">
                <span>下一个回款日</span>
                <span v-text="nextDate">2018年1月31日</span>
            </div>
            <div class="unCalendar" v-show="!nextDate"></div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'calendar',
        data() {
            return {
                now: [new Date().getFullYear(), new Date().getMonth() + 1],
                today: [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()],
                check_day: '',
                tip: {},
                list: [],
                interestCount: 0,       //本月回款收益
                principalCount: 0,      //本月回款本金
                nextDate: '',           //下一回款日
            }
        },
        methods: {
            prev_month() {
                let [year, month] = this.minus
                this.now = [year, month]
                this.getInitData(year, month)
            },
            next_month() {
                let [year, month] = this.add
                this.now = [year, month]
                this.getInitData(year, month)
            },
            seeDetail(index) {
//                if (val === 'prev') {
//                    this.prev_month()
//                    this.getInitData(this.now[0], this.now[1])
//                } else if (val === 'next') {
//                    this.next_month()
//                    this.getInitData(this.now[0], this.now[1])
//                }
                this.check_day = index
                this.list = this.tip[index - this.first + 1]
            },
            async getInitData(year, month) {
                const param = {year: year, month: month}
                const data = await API.get(API.borrowCalendar, param)
                const tip = {}
                const list = data.list
                for (let i = 0; i < list.length; i++) {
                    const json = list[i]
                    tip[json.day * 1] = json.list
                }
                this.tip = tip
                this.list = tip[(this.check_day - this.first + 1) || new Date().getDate()]
                this.interestCount = data.interestCount
                this.principalCount = data.principalCount
                this.nextDate = data.nextDate
            }
        },
        computed: {
            total() {
                return (new Date(this.now[0], this.now[1], 0)).getDate()
            },
            prev() {
                let [year, month] = this.minus
                return (new Date(year, month, 0)).getDate()
            },
            next() {
                let [year, month] = this.add
                return (new Date(year, month, 0)).getDate()
            },
            minus() {
                let [year, month] = this.now
                if (month === 1) {
                    month = 12
                    year -= 1
                } else {
                    month -= 1
                }
                return [year, month]
            },
            add() {
                let [year, month] = this.now
                if (month === 12) {
                    month = 1
                    year += 1
                } else {
                    month += 1
                }
                return [year, month]
            },
            first() {
                let [year, month] = this.now
                return (new Date(year, month - 1, 1)).getDay()
            },
            days() {
                let [year, month] = this.now
                const first = this.first
                const total = this.total
                const today = this.today
                const days = []
                for (let i = 0; i < first; i++) {
                    days.push({
                        val: this.prev - first + i + 1,
                        color: 'black9',
                        type: 'prev'
                    })
                }
                for (let i = 0; i < total; i++) {
                    let json = {
                        val: i + 1,
                        type: 'now'
                    }
                    const diff = new Date(year, month - 1, i + 1).getTime() - new Date(today[0], today[1], today[2]).getTime()
                    if (diff < 0) {
                        json.color = 'black9'
                        json.type = ''
                    } else if (diff === 0) {
                        json.color = 'red'
                    }
                    json.tip = this.tip[i + 1] ? 'tip' : ''
                    days.push(json)
                }
//                for (let i = 0; i < 42 - total - first; i++) {
//                    days.push({
//                        val: i + 1,
//                        color: 'black9',
//                        type: 'next'
//                    })
//                }
                return days
            }
        },
        mounted() {
            this.getInitData(this.now[0], this.now[1])
        }
    }
</script>
<style lang="scss" scoped>
    .head {
        margin-top: 0.2rem;
        justify-content: center;
        @include box((bg:$white, h:1rem, ta:center, fs:0.3rem, d:flex, p:0.3rem 0));
        div:nth-child(odd) {
            margin: 0.06rem 0.3rem;
        }
    }

    @mixin arrow($dir) {
        @if ($dir == prev) {
            @include bg_img('arrow.png');
            transform: rotate(180deg);
        } @else if ($dir == next) {
            @include bg_img('arrow2.png');
        }
        @include box((w:0.3rem, h:0.3rem));
    }

    .prev {
        @include arrow(prev);
    }

    .prev_gray {
        @include arrow(prev);
    }

    .next {
        @include arrow(next);
    }

    .month {
        @include box((h:0.42rem, lh:0.42rem));
    }

    .calendar {
        @include box((p:0 0.3rem, bg:$white, ta:center));
        .week {
            @include box((d:flex, lh:1rem, fs:0.28rem, c:$black9));
            @include thin(top, #e5e5e5);
            div {
                @include box((fx:1));
            }
        }
        .day {
            @include box((d:flex, fs:0.32rem, c:$black2));
            flex-wrap: wrap;
            div {
                @include box((w:14.28%, h:0.8rem));
            }
            p {
                @include box((w:0.5rem, h:0.5rem, lh:0.51rem, m:0 auto, bdr:0.25rem));
            }
        }
    }

    .check_day {
        @include box((bg:$blue, c:#fff));
    }

    .tip {
        position: relative;
        &:before {
            content: attr(tip);
            @include position((p:absolute, r:-0.2rem, t:-0.1rem, z:1));
            @include box((w:0.24rem, h:0.24rem, lh:0.28rem, bg:$red, c:$white, fs:0.2rem, bdr:0.12rem));
        }
    }

    .list {
        @include box((m:0.2rem 0, bg:$white, ta:center));
        .title {
            @include box((fs:0.3rem, h:1rem, lh:1rem));
        }
        .detail {
            margin-left: 0.3rem;
            @include box((h:1.54rem, ta:left, fs:0.3rem));
            &:not(:last-child) {
                @include thin(bottom, #E5E5E5);
            }
            .name {
                @include box((lh:0.8rem, d:flex));
                p {
                    @include box((fx:1,c:$black2,fs:0.3rem));
                }
                p:nth-child(2) {
                    @include box((fs:0.28rem, c:$black9,ta:right,p:0 0.3rem));
                }
            }
            .money {
                @include box((p:0 0.3rem,c:#555,ta:right,fs:0.28rem));
                i{
                    @include box((c:#f64c3e));
                }
                .add{
                    @include bg_img('calendarAdd.png');
                    @include box((d:inline-block,w:0.2rem,h:0.2rem));
                }
            }
        }
        .nextDate{
            margin-top: 0.6rem;height: 3.5rem;
            span:nth-child(1){
                @include box((fs:0.3rem,c:$black2));
            }
            span:nth-child(2){
                @include box((fs:0.28rem,c:#4992ec));margin-left: 2.2rem;
            }
        }
    }

    .unTitle {
        @include box((ta:center, fs:0.28rem, c:$black9));
        padding-top: 0.3rem;
    }

    .unCalendar {
        @include box((w:2.48rem, h:3.48rem, m:1rem auto 0));
        @include bg_img('/my/calendar.png');
    }

    .current{
        @include box((bg:$white,ta:center,p:0.4rem 0));
        .title{
            @include box((fs:0.3rem,c:$black2));
        }
        .all{
            @include box((fs:0.48rem,c:#f64c3e));
        }
        .desc{
            @include box((d:flex,fs:0.24rem,c:#555));
            p{
                @include box((fx:1));
            }
            p:nth-child(1){
                text-align: right;padding-right: 0.15rem;
            }
            p:nth-child(2){
                text-align: left;padding-left: 0.15rem;
            }
            span{
                @include box((m:0 0.1rem));
            }
            .dot{
                @include box((d:inline-block,w:0.1rem,h:0.1rem,bdr:0.5rem));
                margin-bottom: 0.04rem;
            }
            .dotBlue{
                @extend .dot;
                background: #4992ec;
            }
            .dotRed{
                @extend .dot;
                background: #f64c3e;
            }
        }
    }
</style>