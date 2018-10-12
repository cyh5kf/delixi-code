<template>
    <div style="background:#fff">
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/banner.png">
        <!--融资概况-->
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/title_01.png">
        <div class="wrap">
            <div>
                <a target="_blank" href="https://images.51rz.com/movie/al_rz.mp4">
                    <img src="https://images.51rz.com/images/pc/al_zj/alrz_rz.jpg" alt="" style="margin:0.4rem auto 0;display: block;height:4.4rem; width:100%" />
                </a>
            </div>
            <p class="desc">
                2017年1月4日，人众金服携手立元创投，召开“众心筑梦.人众金服A轮融资新闻发布会”，正式宣布平台获得立元创投5000万A轮投资。
            </p>
            <p class="desc">
                通过此轮融资，人众金服将与立元创投密切在整体布局、市场协同、资本运作等各方面合作。同时， 本轮融资款项也将用于加强系统开发、平台运营、团队建设和风控体系等方面。人众金服将借助此轮融资，继续深耕于供应链金融领域，借助“产业+金融+互联网”模式，助力产业腾飞。
            </p>
        </div>
        <!--立元创投-->
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/title_02.png">
        <div class="wrap">
            <img style="padding: 0.5rem 0;margin: 0 auto;width: 2.7rem;"
                 src="https://images.51rz.com/images/wechat/activity/a_summary/lyct.png">
            <p class="desc">
                立元创投创立于2006年，由立元集团有限公司发起设立，专注于PE、VC、天使投资，基金管理等业务，是国内首批市场化运作的专业创投机构之一，总部位于杭州。
            </p>
            <p class="desc">
                依托立元集团强大的实业背景，秉承“资本辅助企业，智本襄助企业”的理念，立元创投已先后投资了100多家上市、拟上市企业，基金管理规模150亿元人民币，所投项目“0失败”，其专业的技术水平和强大的投资能力，得到了业界广泛的认同和一致的赞赏！
            </p>
        </div>
        <!--签约仪式-->
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/title_03.png">
        <div class="wrap">
            <div class="pr">
                <img style="margin: 0.4rem 0;" src="https://images.51rz.com/images/wechat/activity/a_summary/sign.png">
                <div class="mask_banner">
                    在中电华通(江苏)副总经理顾纯郡见证下，人众金服与立元创投正式签约
                </div>
            </div>
            <p class="desc">
                2017年1月4日，人众金服携手立元创投，召开“众心筑梦.人众金服A轮融资新闻发布会”，正式宣布平台获得立元创投5000万A轮投资。
            </p>
            <p class="desc">
                在江苏省中电华通网络服务有限责任公司副总经理顾纯郡女士的见证下，浙江人众金融服务股份有限公司董事长李敏与杭州立元创业投资股份有限公司董事长谢峰正式签订《人众金服A轮融资战略协议》。
            </p>
            <p class="desc">
                本轮融资款项将用于人众金服加强系统开发、平台运营、团队建设和风控体系等方面，而这将助力人众金服继续坚持破解中小微企业发展中的资金瓶颈的战略选择，以实际行动支持实体经济发展。
            </p>
        </div>
        <!--主题分享-->
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/title_04.png">
        <div class="wrap">
            <p class="theme_nav" @click="changeCurrentTheme(0)">人众金服董事长李敏：<span>产业+金融+互联网</span></p>
            <div class="theme_desc" v-show="currentTheme==0">
                <div class="pr">
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/theme_01.jpg">
                    <div class="mask">
                        <span>李敏</span>
                        <span>人众金服&nbsp;&nbsp;董事长</span>
                    </div>
                </div>
                <div class="theme_desc_title">产业+金融+互联网</div>
                <p>我们倡导“产业+金融+互联网”，三者结合就像是一架飞机，产业是机身，金融与互联网便是机翼。机翼不可能在空气中飞起来，需要插在实体机身上。而机身如果缺少了金融与互联网这两个机翼，也是无法腾飞的。</p>
                <p>
                    正所谓“皮之不存，毛将焉附”，目前为止，我们已经为零售行业、进出口贸易、钢贸行业提供供应链服务累计超30多亿，在“产业+金融+互联网”的大趋势下，我们“互联网+供应链”的模式是被认可的！“乘风破浪会有时，直挂云帆济沧海”,我们也会一如既往的秉承金融和互联网服务实体经济的理念不断创新，开启金融支持实体经济的新篇章。</p>
            </div>
            <p class="theme_nav" @click="changeCurrentTheme(1)">立元创投董事长谢峰：<span>金融最终要为实体服务</span></p>
            <div class="theme_desc" v-show="currentTheme==1">
                <div class="pr">
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/theme_02.jpg">
                    <div class="mask">
                        <span>谢峰</span>
                        <span>立元创投&nbsp;&nbsp;董事长</span>
                    </div>
                </div>
                <div class="theme_desc_title">金融最终要为实体服务！</div>
                <p>
                    金融最基本的属性有三层：第一，金融无处不在，第二，信用、杠杆和风险是运作中的关键要素，杠杆是为了更高的收益，信用是核心，是标准，而在这两个前提下，风险把控是所有金融企业的核心！第三，金融最终要为实体服务，脱离了实体，金融可能就失去了它本身最基本的一个属性。牢记金融的本质，把控可能的风险，永远是金融企业的第一要素！</p>
            </div>
            <p class="theme_nav" @click="changeCurrentTheme(2)">中商惠民创始人兼董事长张一春：<span>互联网还是金融，与产业结合才是核心</span></p>
            <div class="theme_desc" v-show="currentTheme==2">
                <div class="pr">
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/theme_03.jpg">
                    <div class="mask">
                        <span>张一春</span>
                        <span>中商惠民&nbsp;&nbsp;创始人兼董事长</span>
                    </div>
                </div>
                <div class="theme_desc_title">互联网还是金融，与产业结合才是核心！</div>
                <p>
                    互联网风吹过来的时候把猪都吹上了天，金融火的时候没有项目拿不到钱的。但是到今年以来整个市场并不好，但是所有的变化都离不开一个核心，产业，只要跟产业结合的好的，不管是金融还是互联网都会发展的很好，立元创投作为业内知名的投资机构，这次投资，我相信应该也是看中了人众金服的这一点，我相信，人众金服独创的“产业+金融+互联网”的商业模式，搭载着互联网这趟快车，利用金融这种工具，服务实体经济，是经得起市场的考验的！</p>
            </div>
            <p class="theme_nav" @click="changeCurrentTheme(3)">著名时评人江南愤青：<span>产业化是互联网金融的发展方向</span></p>
            <div class="theme_desc" v-show="currentTheme==3">
                <div class="pr">
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/theme_04.jpg">
                    <div class="mask">
                        <span>江南愤青</span>
                        <span>著名时评人</span>
                    </div>
                </div>
                <div class="theme_desc_title">产业化是互联网金融的发展方向</div>
                <p>
                    我认为,互联网发展的方向，一个是场景化，第二个是产业化，第三个是技术升级。未来会出现很多的金融机构因为互联网的出现越来越切入场景，可能会成为场景跟金融的部分，在国外，有很多银行，本身就是产业链内的一环，我们可以理解为供应链，就是你把自己放在供应链里面的环节，扮演某种环节，以金融作为工具，把供应链体系做得更好，所以我觉得这种机构是有意义的，而且这样的意味着别人挤不进来，不是谁都能进来的，因为在产业上具有优势，所以2016年我们帮助了很多在产业里面有优势的企业，帮助他实现互联网化。我们的战略是“非互联网工具的互联网化非金融工具的金融化”，用互联网的方式能够把金融业做的更加深入，从而服务于中小企业的发展。</p>
            </div>
            <p class="theme_nav" @click="changeCurrentTheme(4)">人众金服CEO薛刚：<span>合规化、精细化是我们不变的主题</span></p>
            <div class="theme_desc" v-show="currentTheme==4">
                <div class="pr">
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/theme_05.jpg">
                    <div class="mask">
                        <span>薛刚</span>
                        <span>人众金服&nbsp;&nbsp;CEO</span>
                    </div>
                </div>
                <div class="theme_desc_title">合规化、精细化是我们不变的主题</div>
                <p>
                    2016年整个供应链的规模达到10万亿，在2020年应收账款应该达到20万亿，而中心企业只覆盖了其中10%的需求，这也是我们专注供应链金融的初心。深入“产业+金融+互联网”，服务小微，深入产业是我们不变的目标，在安全运营的1348天里，我们共发起了27574笔贷款，服务了67万用户，累计交易量40亿，待收7亿，为用户带来1.6亿收益。
                    在大市场做好小生意，2017年，“合规化”和“精细化”将是人众金服不变的主题，第一步我们会针对当下的监管，做好整体的合规，第二步我们会更精细化的运营，运作整个项目。众心筑梦，有梦才有未来，在这个梦想之下，我相信我们可以完成平台向百亿甚至千亿的跨越。</p>
            </div>
        </div>
        <!--记者采访-->
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/title_05.png">
        <div class="wrap">
            <div class="pr">
                <img style="margin: 0.2rem 0;"
                     src="https://images.51rz.com/images/wechat/activity/a_summary/reporter.png">
                <div class="mask_banner">
                    左为立元创投董事长谢峰、中为人众金服董事长李敏，右为中电华通（江苏）副总经理顾纯郡
                </div>
            </div>
            <div>
                <p class="reporter_li"><span></span>记者问：A轮融资后，人众金服下一步的计划是什么？</p>
                <p class="reporter_name">李敏 . 浙江人众金融服务股份有限公司 董事长:</p>
                <p class="reporter_desc">
                    深耕！现有的模式还较为粗放，更多的细节还有待完善，5000万的融资代表了市场对于该“互联网+供应链金融”模式的信任，下一步，我们会在“产业+金融+互联网”的大趋势下，继续深耕，让这个产业和市场去盈利，让更多的目光聚焦在这一块！美丽的玉石需要不断的打磨才会完美，产业也是！</p>
            </div>
            <div>
                <p class="reporter_li"><span></span>记者问：为什么会选择投资人众金服5000万？</p>
                <p class="reporter_name">谢峰 . 杭州立元创业投资股份有限公司 董事长:</p>
                <p class="reporter_desc">
                    作为一家长期从事这个投资的专业机构，我们会更加考虑一个企业的创新性问题，在与人众金服接触后，我感觉无论是从商业模式还是探索思路上，以李敏为核心团队生机勃勃，处处都有创新点。投资，是一件很严谨的事情，通过几个月的深入的调研，我们决定投资人众金服，也是希望他们关注的企业可能会带动我们去做一些服务企业的投资。</p>
                <p class="reporter_desc">
                    而且金融行业非常之大，但从产业的角度来讲，我们国家的金融是落后的，它为实体经营企业，尤其对于小微企业这个是不公平的，没有发挥整个金融给社会真正服务的一个功能。人众金服致力于扶持小微企业的定位是我们非常看重的一个点。</p>
            </div>
            <div>
                <p class="reporter_li"><span></span>记者问：中电华通（江苏）为什么会选择人众金服作为投资对象？</p>
                <p class="reporter_name">顾纯郡 . 江苏省中电华通网络服务有限责任公司 副总经理，董事:</p>
                <p class="reporter_desc">
                    我认为，人众金服的李总很能代表杭州这一代金融人的做事风格：执着且充满热情，尽心做好每一件事，而且据我观察他们的团队很有开创性，很有活力，这就是我们选择的关键点！一个真正有创新性的团队再加上一个热情执着于金融行业的领路人，只要具备了这两个要素，我相信这个企业一定能够成功。</p>
            </div>
        </div>
        <!--现场图集-->
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/title_06.png">
        <div>
            <div class="swiper-container" style="overflow: hidden;">
                <div id="swiper-wrapper" class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_01.jpg">
                        <div class="mask_photo">
                            在中电华通（江苏）顾纯郡女士见证下，人众金服与立元创投正式签署A轮融资战略协议
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_02.jpg">
                        <div class="mask_photo">
                            人众金服董事长李敏、立元创投董事长谢峰、副总经理张锐军与江苏中电华通法定代表人徐梓华、副总经理顾纯郡共同启动A轮融资签约仪式
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_03.jpg">
                        <div class="mask_photo">
                            人众金服董事长李敏、立元创投董事长谢峰、副总经理张锐军与江苏中电华通法定代表人徐梓华、副总经理顾纯郡共同启动A轮融资签约仪式
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_04.jpg">
                        <div class="mask_photo">
                            江苏中电华通法定代表人徐梓华、副总经理顾纯郡出席人众金服A轮融资发布会
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_05.jpg">
                        <div class="mask_photo">
                            著名时评人、自由投资人“江南愤青”陈宇出席人众金服A轮融资发布会
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_06.jpg">
                        <div class="mask_photo">
                            人众金服董事长李敏出席人众金服A轮融资发布会
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_07.jpg">
                        <div class="mask_photo">
                            人众金服董事长李敏发表主题演讲：“产业+金融+互联网”
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_08.jpg">
                        <div class="mask_photo">
                            立元创投董事长谢峰发表主题演讲：金融最终要为实体经济服务
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_09.jpg">
                        <div class="mask_photo">
                            中商惠民董事长张一春发表主题演讲：互联网或者金融，与产业结合才是核心
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_10.jpg">
                        <div class="mask_photo">
                            “江南愤青”陈宇发表主题演讲：产业化是互联网金融的发展方向
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_11.jpg">
                        <div class="mask_photo">
                            人众金服CEO薛刚展望2017：合规化和精细化是我们不变的主题
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="https://images.51rz.com/images/wechat/activity/a_summary/photo_12.jpg">
                        <div class="mask_photo">
                            发布会后，人众金服董事长李敏、立元创投董事长谢峰与江苏中电华通副总经理顾纯郡一起接受记者采访
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--媒体报道-->
        <img src="https://images.51rz.com/images/wechat/activity/a_summary/title_07.png">
        <div class="wrap">
            <div class="media">
                <a href="http://xhpfm.mobile.zhongguowangshi.com/v300/newshare/1459507?channel=weixin&from=singlemessage">
                    <div>
                        <p class="media_title"><span>【新华社】</span><span>2017-01-05</span></p>
                        <p class="media_desc">人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_01.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://m.8531.cn/news/524726.html?from=singlemessage&weixin_share_count=1&winzoom=1">
                    <div>
                        <p class="media_title"><span>【浙江日报】</span><span>2017-01-04</span></p>
                        <p class="media_desc">人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_03.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://zj.qq.com/a/20170105/012640.htm">
                    <div>
                        <p class="media_title"><span>【腾讯大浙】</span><span>2017-01-05</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_04.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://www.wdtianxia.com/xfjr/95765.jhtml?from=singlemessage&isappinstalled=0#10006-weixin-1-52626-6b3bffd01fdde4900130bc5a2751b6d1">
                    <div>
                        <p class="media_title"><span>【网贷天下】</span><span>2017-01-04</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_05.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://zj.sina.com.cn/finance/regional/2017-01-05/detail_f-ifxzkfuh5340881.shtml?from=wap&isappinstalled=1">
                    <div>
                        <p class="media_title"><span>【浙江新浪财经】</span><span>2017-01-05</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_06.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://news.p2peye.com/article-490735-1.html">
                    <div>
                        <p class="media_title"><span>【网贷天眼】</span><span>2017-01-04</span></p>
                        <p class="media_desc">人众金服宣布获立元创投5000万元A轮融资</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_07.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://www.wzs.org.cn/zb/201701/t20170105_237756.shtml">
                    <div>
                        <p class="media_title"><span>【浙商杂志】</span><span>2017-01-05</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_08.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://www.p2pguancha.com/news/5133.html">
                    <div>
                        <p class="media_title"><span>【P2P观察】</span><span>2017-01-04</span></p>
                        <p class="media_desc">人众金服完成A轮融资，获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_09.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://news.trjcn.com/detail_184854.html">
                    <div>
                        <p class="media_title"><span>【投融界】</span><span>2017-01-05</span></p>
                        <p class="media_desc">人众金服获5000万元A轮融资，投资方为立元创投</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_10.png"/>
                </a>
            </div>
            <div class="media">
                <a href="https://m.findaily.cn/appshare/dksShare/?id=1155&from=singlemessage&isappinstalled=1">
                    <div>
                        <p class="media_title"><span>【今日金融】</span><span>2017-01-04</span></p>
                        <p class="media_desc">坚持“供应链匠心”，人众金服A轮拿到立元创投5000万元注资</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_11.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://mt.sohu.com/20170106/n477950386.shtml">
                    <div>
                        <p class="media_title"><span>【搜狐】</span><span>2017-01-06</span></p>
                        <p class="media_desc">【焦点】供应链金融受青睐，人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_12.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://www.ccstock.cn/gscy/qiyexinxi/2017-01-04/A1483519641122.html">
                    <div>
                        <p class="media_title"><span>【证券日报网】</span><span>2017-01-04</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_13.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://n.cztv.com/news/12372627.html?clearcache=1">
                    <div>
                        <p class="media_title"><span>【新蓝网】</span><span>2017-01-04</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_14.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://www.erongtu.com/info/view-index-id-23630.html">
                    <div>
                        <p class="media_title"><span>【融途网】</span><span>2017-01-05</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_15.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://m.zjol.com.cn/mzjol/details.html?newsid=021414937&from=singlemessage&isap">
                    <div>
                        <p class="media_title"><span>【浙江在线】</span><span>2017-01-05</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万融资</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_16.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://money.hangzhou.com.cn/investment/content/2017-01/05/content_6436646.htm?from=singlemessage&isappinstalled=0">
                    <div>
                        <p class="media_title"><span>【杭州网】</span><span>2017-01-05</span></p>
                        <p class="media_desc">互联网+供应链金融 人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_17.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://m.zjol.com.cn/mzjol/details.html?newsid=021414937&isappinstalled=0&from=sing">
                    <div>
                        <p class="media_title"><span>【浙商网】</span><span>2017-01-05</span></p>
                        <p class="media_desc">供应链金融受青睐 人众金服获立元创投5000万融资</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_18.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://mingin.baijia.baidu.com/article/745952">
                    <div>
                        <p class="media_title"><span>【鸣金网】</span><span>2017-01-06</span></p>
                        <p class="media_desc">人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_19.png"/>
                </a>
            </div>
            <div class="media">
                <a href="http://news.10jqka.com.cn/20170105/c595899734.shtml">
                    <div>
                        <p class="media_title"><span>【同花顺金融网】</span><span>2017-01-05</span></p>
                        <p class="media_desc">供应链金融受青睐，人众金服获立元创投5000万资本注入</p>
                    </div>
                    <img src="https://images.51rz.com/images/wechat/activity/a_summary/media_20.png"/>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    export default {
        name: 'Asummary',
        data(){
            return {currentTheme: 0,}
        },
        methods: {
            setSlider(){
                const swiper = new Swiper('.swiper-container', {
                    autoplayDisableOnInteraction: false,
                    autoplay: 3000,
                    loop: true,
                })
            },
            changeCurrentTheme(index){
                this.currentTheme = index;
            }
        },
        mounted: function () {
            this.setSlider();
        },
        created: function () {
        }
    }
</script>
<style lang="scss" scoped>
    @import "./../../css/swiper.min.css";

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    img {
        width: 100%;
        display: block;
    }

    .wrap {
        width: 94%;
        margin: 0 auto;
        padding-bottom: 0.4rem;
    }

    .desc {
        color: #313131;
        font-size: 0.26rem;
        line-height: 0.42rem;
        text-indent: 2em;
        margin: 0 auto;
    }

    .theme_nav {
        background: #f0f8fe;
        font-size: 0.28rem;
        line-height: 0.78rem;
        padding: 0 0.2rem;
        margin-top: 0.3rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .theme_nav span {
        color: #02466c;
    }

    .theme_desc img {
        width: 80%;
        margin: 0.4rem auto;
    }

    .theme_desc .theme_desc_title {
        font-size: 0.3rem;
        line-height: 0.5rem;
        color: #313131;
    }

    .theme_desc p {
        font-size: 0.26rem;
        line-height: 0.42rem;
        color: #666;
        text-indent: 2em;
    }

    .pr {
        position: relative;
    }

    .mask {
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 80%;
        color: #fff;
        padding: 0.2rem;
        background: rgba(0, 0, 0, 0.6);
    }

    .mask span {
        display: block;
    }

    .mask span:nth-child(1) {
        font-size: 0.32rem;
    }

    .mask span:nth-child(2) {
        font-size: 0.28rem;
    }

    .mask_banner {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        padding: 0.2rem;
        background: rgba(0, 0, 0, 0.6);
        font-size: 0.28rem;
    }

    .mask_photo {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        padding: 0.2rem;
        background: rgba(0, 0, 0, 0.6);
        font-size: 0.28rem;
        height: auto !important;
    }

    .reporter_li {
        font-size: 0.28rem;
        line-height: 0.38rem;
        margin-top: 0.4rem;
    }

    .reporter_li span {
        display: inline-block;
        background: #46c1f4;
        width: 0.15rem;
        height: 0.38rem;
        float: left;
        margin-right: 0.1rem;
    }

    .reporter_name {
        color: #333;
        font-size: 0.26rem;
        margin: 0.2rem 0;
    }

    .reporter_desc {
        color: #666;
        font-size: 0.26rem;
        text-indent: 2em;
        line-height: 0.42rem;
    }

    .media {
        margin-top: 0.4rem;
        padding: 0 0.2rem;
    }

    .media div {
        float: right;
        width: 70%;
    }

    .media img {
        width: 1.7rem;
        height: 1.3rem;
        margin-right: 0.3rem;
    }

    .media_title span:nth-child(1) {
        font-size: 0.36rem;
        color: #333;
    }

    .media_title span:nth-child(2) {
        font-size: 0.26rem;
        color: #999;
    }

    .media_desc {
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333;
        font-size: 0.28rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    #swiper-wrapper {
        width: 10000%;
        height: 5rem;
        overflow: hidden;
        position: relative;
    }

    #swiper-wrapper div {
        height: 5rem;
        float: left;
        width: 7.5rem;
    }

    .swiper-slide {
        position: relative;
    }
</style>