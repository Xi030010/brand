<!-- 上传与下载明细 -->
<template>
    <div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <div class="brandConnect">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>我的资源</el-breadcrumb-item>
                <el-breadcrumb-item>已下载</el-breadcrumb-item>
                <el-breadcrumb-item>上传资源</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="left">
                <div>
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="上传明细" name="first">
                            <div>
                                <div style="width: 500px">
                                    <a class="questionTitle">刷机教程.doc——三星GT-I9070线刷教程</a>
                                    <p class="questionInf">想要刷机但是没有尝试过刷机的三星小伙伴们可以参考一下本教程。</p>
                                    <p class="questionTime">上传时间：<span>2019-07-15</span>所需积分：<span>5</span></p>
                                </div>
                                <p class="moreDownBtnUp">已通过</p>
                                <el-link :underline="false" class="moreDownBtn">编辑</el-link>
                                <hr style="border: 1px dotted #ccc;">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="下载明细" name="second">
                            <div>
                                <div style="width: 500px">
                                    <a class="questionTitle">刷机教程.doc——三星GT-I9070线刷教程</a>
                                    <p class="questionInf">想要刷机但是没有尝试过刷机的三星小伙伴们可以参考一下本教程。</p>
                                    <p class="questionTime">上传时间：<span>2019-07-15</span>所需积分：<span>5</span></p>
                                </div>
                                <el-link :underline="false" class="moreDownBtnDown">立即评价</el-link>
                                <hr style="border: 1px dotted #ccc;">
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="right">
                <div class="myAnswer">
                    <div class="userPic">
                        <div class="selfPic"></div>
                        <div>
                            <p style="color: #3399ff;font-size: 18px;">用户</p>
                            <p style="color: #666;font-size:18px;">积分：<span style="color: red">10</span></p>
                        </div>
                    </div>
                    <p>上传了<span>{{ uploadNum }}</span>个资源</p>``
                    <p>下载了<span>{{ downloadNum }}</span>个资源</p>
                </div>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>他的资源</span>
                        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                    </div>
                    <div></div>
                </el-card>
            </div>
        </div>

    </div>
    <footerBar></footerBar>
    </div>
</template>

<script>
import login from '~/components/login';
import navbar from '~/components/nav';
import footerBar from '~/components/footer';
import search from '~/components/searchInput';
import axios from 'axios'
import Cookies from '~/plugins/cookie';

export default {
  middleware: 'auth',
  components: {
    login,
    navbar,
    footerBar,
    search
  },

  data () {
    return {
      brandCondition: [],
      show: 'none',
      input3: '',
      activeName: 'first',
      uploadNum: Cookies.get('uploadNum'),
      downloadNum: Cookies.get('downloadNum')
    };
  },
  mounted () {
    
  },

  methods: {
  }
}
</script>
<style lang='less'>
@import '~assets/less/main.less';
.container {
    position: relative;
}

.brandConnect {
    overflow: hidden;
    background: #f5f5f5;
    min-height: 500px;
    margin-top: 50px;
    padding: 20px 40px;

}

hr {
    margin: 10px auto;
}

.brandCondition {
    background: #fff;
    width: 1000px;
    min-height: 100px;
    margin: 20px auto;
    padding: 10px;
}

.brandCondition span {
    margin: 0px 10px;
    cursor: pointer;
}

.brandCondition span:hover {
    color: #409EFF;
}

.showCondition {
    display: inline-block;
    border: 1px solid #409EFF;
    
}

.left {
    float: left;
    width: 700px;
    height: 800px;
    background: #fff;
    margin-top: 20px;
}

.right {
    float: right;
    width: 280px;
    height: 800px;
    background: #fff;
    margin-top: 20px;
}

.userPic {
    display: flex;
}

.userPic div {
    //border: 1px solid #000;
    height: 70px;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
}

.userPic div:nth-child(2) {
    flex: 1;
}

.userPic div:nth-child(2) p {
    line-height: 35px;
}

.selfPic {
    width: 70px;
    height: 70px;
    border: 1px solid #ccc;
    margin-top: 10px;
    margin-left: 10px;
}

.myAnswer p {
    color: #333;
}

.myAnswer p:nth-last-child(1),
.myAnswer p:nth-last-child(2),
.myAnswer p:nth-last-child(3) {
    line-height: 35px;
    margin-left: 10px;
}

.myAnswer p:nth-last-child(1) span,
.myAnswer p:nth-last-child(2) span,
.myAnswer p:nth-last-child(3) span {
    color: #3399ff;
}

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

.questionTime {
    color: #6a6f6f;
    margin-bottom: 10px;
    //text-align: right;
}

.questionTitle {
    color: #333333;
    font-size: 20px;   
}

.questionInf {
    width: 80%;
    color: #6a6f6f;
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 20px;
}

.questionTime span {
    margin: 0 30px 0 0;
}

.moreDownload {
    margin-top: 100px;
    overflow: hidden;
    position: relative;
}

.moreDownBtn {
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translateY(-50%);
}

.moreDownBtnUp {
    color: #67C23A;
    position: absolute;
    top: 18%;
    right: 100px;
}

.moreDownBtnDown {
    position: absolute;
    top: 50%;
    right: 100px;
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}
</style>
