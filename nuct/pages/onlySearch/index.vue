<!-- 单一搜索 -->
<template>
<div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <div v-if="mallCode === '品牌'" class="showBrand">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>品牌查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="brand">
            <div v-for = "(item, i) in showList" :key="i" @click="turnDetails(1, item.name)"> 
                    <p class="brandTitle">{{ item.name }}</p>
                    <p class="brandIntroduction">{{ item.introduction }}</p>
            </div>
            <!-- <div v-for = "item in 10"> 
                <p class="brandTitle"></p>
                <p class="brandIntroduction"></p>
            </div> -->
        </div>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="pageNum"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="consoleCurr">
        </el-pagination>
    </div>
    <div v-if="mallCode === '资料'" class="showBrand">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资料查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="brand" v-if="showList.length">
          <div class="left">
            <div v-for = "(item, i) in showList" :key = "i">
                <a class="questionTitle" @click="turnInfor(item.id)">{{ item.title }}</a>
                <p class="questionInf">{{ item.description }}</p>
                <p class="questionTime">资源大小：<span>900KB</span>上传时间：<span>{{ item.createTime }}</span>上传者：

                <span>Mr.Boring</span></p>
                  <hr>
              </div>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="pageNum"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="consoleCurr">
              </el-pagination>
            </div>
        </div>
    </div>
    <div v-if="mallCode === '话题'" class="showBrand">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>话题查询</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="questionList">
            <div v-for = "(item, i) in showList" :key = "i">
                <div class="answerNamber">
                    <p>5</p>
                    <p>回答</p>
                </div>
                <p class="questionTime"><span>{{ item.createTime }}</span>来自 qq_17642463</p>
                <a class="questionTitle" @click="turnUrl('/brandAnswer')">{{ item.title }}</a>
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
          :total="pageNum"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="consoleCurr">
        </el-pagination>
    </div>
    <footerBar></footerBar>
</div>
</template>

<script>
import login from '~/components/login';
import footerBar from '~/components/footer';
import navbar from '~/components/nav';
import search from '~/components/searchInput';
import axios from 'axios';
import Cookies from '~/plugins/cookie';

axios.defaults.baseURL = "http://47.104.148.196:8081/dbblog";

export default {
  middleware: 'auth',
  data () {
    return {
      input5: '',
      mallCode: null,
      showList: [],
      pageNum: null,
      pageSize: 6,
      currentPage: 1,
      totalPage: [],
    };
  },
  components: {
      login,
      footerBar,
      navbar,
      search,
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        this.mallCode = val.query.mallCode
        this.input5 = val.query.keywords
      },
      deep: true
    }
  },
  mounted() {
    this.mallCode = this.mallCode || this.$route.query.mallCode
    //   axios.get('/brands/search',{
    //       params: {
    //           keywords: 'http',
    //       }
    //   }).then(res => {
    //       console.log(res.data);
    //   }).catch(error => {
    //     console.log(error);
    // });
    if( this.mallCode == "品牌") {
      axios({
        url: 'http://47.104.148.196:8081/dbblog/portal/search/brands/search',
        methods: 'get',
        params: {
          keywords: this.input5,
          token: Cookies.get('token'),
        }
      }).then(res => {
        console.log(res.data);
        var brandList = res.data.brandList;
        this.pageNum = Math.ceil(res.data.brandList.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = list.slice(this.size * i, this.size * (i + 1))
        }
        this.showList = this.totalPage[this.currentPage - 1];
      })
    }else if (this.mallCode == "资料") {
      axios({
        url: 'http://172.18.133.7:8080/dbblog/informations/search',
        methods: 'get',
        params: {
          keywords: this.input5,
          token: Cookies.get('token'),
        }
      }).then(res => {
        console.log(res.data)
        var informationList = res.data.informationList;
        this.pageNum = Math.ceil(res.data.informationList.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = list.slice(this.size * i, this.size * (i + 1))
        }
        this.showList = this.totalPage[this.currentPage - 1];
      })
    }else if (this.mallCode == "话题") {
      axios({
        url: 'http://172.18.133.7:8080/dbblog/topics/search',
        methods: 'get',
        params: {
          keywords: this.input5,
          token: Cookies.get('token'),
        }
      }).then(res => {
        console.log(res.data)
        var topicList = res.data.topicList;
        this.pageNum = Math.ceil(res.data.topicList.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
                this.totalPage[i] = list.slice(this.size * i, this.size * (i + 1))
        }
        this.showList = this.totalPage[this.currentPage - 1];
      })
    }
  },
  methods: {
    turnDetails (url, name) {
        this.$router.push({
        path: '../brandInformation',
        // name: 'mallList',
        query: {
          mallCode: url,
          name: name
        }
      })
    },
    turnInfor (url) {
        this.$router.push({
        path: '../docInfor',
        //name: 'mallList',
        query: {
          mallCode: url
        }
      })
    },
    consoleCurr (val) {
      //console.log(`${val}`);
      this.currentPage = val;
      this.showList = this.totalPage[this.currentPage - 1];
      //console.log(this.currentPage);
    }
  }
}

</script>
<style lang='less'>
@import '~assets/less/main.less';
.showBrand {
    position: relative;
    //background: #f5f5f5;
    //margin-top: 50px;
    height: 1000px;
    padding-top: 10px;
}

.Breadcrumb {
    margin-left: 20px;
    margin-bottom: 50px;
}

.condition {
    background: #fff;
    height: 100px;
    width: 980px;
    margin: 0 auto;
}

.brand {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
}

.brand div {
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
    width: 300px;
    height: 200px;
    background: #fff;
    overflow: hidden;
}

.el-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
}

.brandTitle {
    font-weight: 600;
    margin-left: 10px;
    margin-top: 10px;
}

.brandIntroduction {
    margin-left: 10px;
    margin-top: 5px;
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}
</style>