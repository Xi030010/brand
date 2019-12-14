<!-- 品牌交流 -->
<template>
    <div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <div class="brandConnect">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="padding-left: 30px;">
            <el-menu-item index="1" @click="tabs('questionList')">问题首页</el-menu-item>
            <el-menu-item index="2">悬赏问题</el-menu-item>
            <el-menu-item index="3">已解决</el-menu-item>
            <el-menu-item index="4">未解决</el-menu-item>
        </el-menu>
        <!-- <el-input class="questionSearch" v-model="input" placeholder="问题搜索"></el-input> -->
        <div class="questionList" :style="{ visibility: tabsVisibility.questionList }">
            <div v-for = "(item, i) in showList" :key = "i">
                <div class="answerNamber">
                    <p>5</p>
                    <p>回答</p>
                </div>
                <p class="questionTime"><span>{{ item.createTime }}</span>来自 qq_17642463</p>
                <a class="questionTitle" @click="$router.push({path: '../brandAnswer', query: {topicId: item.id}})">
                  {{ item.title }}
                </a>
                <p class="questionInf">{{ item.description }}</p>
                <div class="showData">
                    <p>浏览<span>{{ item.readNum }}</span></p>
                    <p>收藏<span>0</span></p>
                    <p>同问<span>0</span></p>
                </div>
                <hr>
            </div>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            :current-page="currentPage"
            @current-change="consoleCurr">
        </el-pagination>
        <div class="questionRightBar">
            <el-button type="primary" @click="turnUrl('/askQuestion')" style="width: 100%; border-radius: 0px; background: #6b2049; border: 1px solid #6b2049;">我要提问</el-button>
            <div class="myAnswer">
                <p class="questionRightTitle">我的回答</p>
                <hr>
                <div class="userPic">
                    <div class="selfPic"></div>
                    <div>
                        <p style="color: #3399ff;font-size: 18px;">用户</p>
                        <p style="color: #666;font-size:18px;">积分：<span style="color: red">{{ userPoint }}</span></p>
                    </div>
                </div>
                <p>提了<span>{{ askNum }}</span>个问题，<span>0</span>人进行了回答</p>
                <p>回答了<span>{{ answerNum }}</span>个问题</p>
                <p>有<span>0</span>个同问</p>
            </div>
            <div class="hotNote">
                <p class="hotNoteTitle">热门标签</p>
                <a href="" class="hotNoteMore">更多</a>
                <hr>
                <el-tag v-for="(item,index) in hotTag" :key="index">
                    {{ item.name }}
                </el-tag>
            </div>
            <div class="newResponse">
                <p class="newResponseTitle">最新回答</p>
                <hr>
                <div class="responseList">
                    <div>
                        <img src="" alt="">
                    </div>
                    <div>
                        <p><span>朱古力·不二</span> 回答了： 如何利用品牌计算进行分析计算进行分析</p>
                    </div>
                </div>
                <hr>
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
import axios from 'axios';
import Cookies from '~/plugins/cookie';
export default {
  middleware: 'auth',
  components: {
      login,
      navbar,
      footerBar,
      search,
  },

  data () {
    return {
        activeIndex: '1',
        input: '',
        tabsVisibility: {
            questionList: '',
        },
        list: [],
        total: 3,
        size: 6,
        currentPage: 1,
        pageNum: 0,  
        totalPage: [],
        showList: [],
        hotTag: [],
        userPoint: Cookies.get('points'),
        askNum: Cookies.get('askNum'),
        answerNum: Cookies.get('answerNum')
    };
  },

  mounted() {
    axios({
        url: 'http://47.104.148.196:8081/dbblog/portal/topic/topics',
        method: 'get',
        params: {
            token: Cookies.get('token')
        }
    }).then(res => {
      console.log(res.data.page);
      this.list = res.data.page.list;
      this.total = res.data.page.totalCount;
      this.size = res.data.page.pageSize;
      this.pageNum = Math.ceil(this.total / this.size) || 1;
      for (let i = 0; i < this.pageNum; i++) {
              this.totalPage[i] = this.list.slice(this.size * i, this.size * (i + 1))
      }
      this.showList = this.totalPage[this.currentPage-1];

    })

    axios({
        url: 'dbblog/portal/operation/tags/3',
        method: 'get',
        params: {
          token: Cookies.get('token'),
        }
    }).then(res => {
        this.hotTag = res.data.tagList;
        //console.log(this.hotTag);
    })

  },

  methods: {
    tabs(xx) {
        for ( let vib in this.$data.tabsVisibility) {
            this.$data.tabsVisibility[vib] = 'hidden';
        }
        this.$data.tabsVisibility[xx] = '';
    },

    turnUrl(url) {
        location.href = url;
    },

    consoleCurr (val) {
        //console.log(`${val}`);
        this.currentPage = val;
        this.showList = this.totalPage[this.currentPage-1];
        //console.log(this.currentPage);
    }
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
    //background: #f5f5f5;
    min-height: 500px;
    //margin-top: 100px;
    box-shadow: 0px 2px 10px 4px #ccc;
}

.brandNav {
    background: #e4e9ec;
    height: 40px;
}

.questionSearch {
    position: absolute;
    width: 400px;
    right: 30px;
    top: 142px;
    z-index: 1000;
}

.questionList {
    position: relative;
    margin-top: 20px;
    margin-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-left: 20px;
    min-height: 300px;
    height: 100%;
    width: 700px;
    float: left;
    background: #fff;
}

.questionRightBar {
    margin-top: 20px;
    margin-right: 40px;
    min-height: 300px;
    width: 300px;
    float: right;
    //background: #f5f5f5;
}

.questionTime {
    color: #6a6f6f;
    margin-bottom: 10px;
}

.questionTitle {
    color: #333333;
    font-size: 20px;
    cursor: pointer;
}

.questionInf {
    width: 500px;
    color: #6a6f6f;
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 20px;
}

.answerNamber {
    position: absolute;
    right: 80px;
    width: 80px;
    height: 80px;
    background: #ef8b3b;
    padding-top: 20px;
}

.answerNamber p {
    text-align: center;
    color: #fff;
    font-weight: 700;
}

.myAnswer, .hotNote, .newResponse {
    width: 100%;
    height: 250px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #fff;
    padding-top: 5px;
}

.newResponse {
    min-height: 500px;
}

.questionRightTitle, .hotNoteTitle, .newResponseTitle {
    color: #333333;
    font-size: 20px;
    margin: 5px;
}

.hotNoteTitle {
    display: inline-block;
}

.hotNoteMore {
    display: inline-block;
    margin-left: 165px;
    color: #3399ff;
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

.showData {
    position: relative;
    left: 500px;
}


.showData p {
    display: inline-block;
    margin-bottom: 5px;
}

.responseList {
    display: flex;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.responseList div:nth-child(1) {
    flex: 1;
}

.responseList div:nth-child(1) img {
    border: 1px solid #ccc;
    display: block;
    width: 50px;
    height: 100%;
    border-radius: 100%;
    margin: 0 auto;
}

.responseList div:nth-child(2) {
    padding-top: 6px;
    padding-right: 20px;
    flex: 2;
    overflow: hidden;
}

.responseList div:nth-child(2) p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.responseList div:nth-child(2) span {
    color: #3399ff;
}

hr {
    margin-bottom: 20px;
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}

.el-pagination {
    position: absolute;
    left: 30%;
    transform: translateX(-50%);
    bottom: 350px;
}
</style>