<!-- 我的计算 -->
<template>
<div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <el-tabs type="border-card"  :tab-position="tabPosition" style="height: 580px; width: 750px; margin: 20px auto;border-radius: 55px;">
      <el-tab-pane label="个人资料">
          <h1 class="selfInfTitle">个人资料</h1>
          <hr>
          <div id="selfInf">
              <div class="selfInfFlex1">
                  <img :src="this.avatar" class="selfInfImg">
                  <a>修改头像</a>
              </div>
              <div class="selfInfFlex2">
                  <p>ID：</p>
                  <p style="margin-bottom: 50px">关注：<span>4</span>&nbsp;&nbsp;&nbsp;&nbsp;积分：<span>222</span></p>
                  <a>充值</a>
                  <p>昵称：<span>{{ this.name }}</span></p>
                  <p>实名：<span>{{ this.nickname }}</span></p>
                  <p>手机号：<span>{{ this.phone }}</span></p>
                  <p>邮箱：<span>{{ this.email }}</span></p>
                  <p>积分：<span>{{ this.points }}</span></p>
              </div>
          </div>
      </el-tab-pane>
      <el-tab-pane label="我的计算">
          <ul class="myCount_ul">
              <li v-for="(item,i) in myCount_showList" :key="i">{{ item.brandName }} <span style="float: right">{{ item.createTime }}</span></li>       
          </ul>
          <el-pagination
          small
          layout="prev, pager, next"
          class="myCount_pagination"
          :total="myCount_total"
          :page-size="myCount_size"
          :current-page="myCount_currentPage"
          @current-change="myCount_consoleCurr">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="我的查询">
          <ul class="search_ul">
              <li v-for="(item,i) in search_showList" :key="i">{{ item.brandName }} <span style="float: right">{{ item.createTime }}</span></li>       
          </ul>
          <el-pagination
          small
          layout="prev, pager, next"
          class="search_pagination"
          :total="search_total"
          :page-size="search_size"
          :current-page="search_currentPage"
          @current-change="search_consoleCurr">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="我的积分">
          <ul class="point_ul">
              <li v-for="(item,i) in point_showList" :key="i">{{ item.remark }} {{ item.points }} <span style="float: right">{{ item.createTime }}</span></li>       
          </ul>
          <el-pagination
          small
          layout="prev, pager, next"
          class="point_pagination"
          :total="point_total"
          :page-size="point_size"
          :current-page="point_currentPage"
          @current-change="point_consoleCurr">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="我的资源">
        <MyResource></MyResource>
      </el-tab-pane>
    </el-tabs>
    <footerBar  style="width: 1080px;position: absolute; bottom: 0;"></footerBar>
</div>
</template>

<script>
import login from '~/components/login';
import footerBar from '~/components/footer';
import navbar from '~/components/nav';
import search from '~/components/searchInput';
import axios from 'axios';
import Cookies from '~/plugins/cookie';
import MyResource from '~/components/MyResource'

export default {
  middleware: 'auth',
  data () {
    return {
      tabPosition: 'left',
      name: '0',
      nickname: '',
      phone: '',
      email: '',
      // avatar: '../../_nuxt/static/img/selfInfText.jpg',
      avatar: 'img/selfInfText.jpg',
      points: '',

      myCount_list: [],
      myCount_totalPage: [],
      myCount_total: 3,
      myCount_size: 6,
      myCount_currentPage: 1,
      myCount_pageNum: 0,
      myCount_showList: [],

      point_list: [],
      point_totalPage: [],
      point_total: 3,
      point_size: 6,
      point_currentPage: 1,
      point_pageNum: 0,
      point_showList: [],

      search_list: [],
      search_totalPage: [],
      search_total: 3,
      search_size: 6,
      search_currentPage: 1,
      search_pageNum: 0,
      search_showList: [],
    }
  },
  components: {
    login,
    footerBar,
    navbar,
    search,
    MyResource,
  },

  methods: {
    myCount_consoleCurr (val) {
        //console.log(`${val}`);
        this.myCount_currentPage = val;
        this.myCount_showList = this.myCount_totalPage[this.myCount_currentPage-1];
        //console.log(this.currentPage);
    },

      point_consoleCurr (val) {
        //console.log(`${val}`);
        this.point_currentPage = val;
        this.point_showList = this.point_totalPage[this.point_currentPage-1];
        //console.log(this.currentPage);
    },

      search_consoleCurr (val) {
        //console.log(`${val}`);
        this.search_currentPage = val;
        this.search_showList = this.search_totalPage[this.search_currentPage-1];
        //console.log(this.currentPage);
    }
  },

  mounted() {
    axios({
        url: 'dbblog/portal/user/info/7',
        method: 'get',
        params: {
            'token': Cookies.get('token')
        }
    }).then(res => {
        this.name = res.data.user.username;
        this.nickname = res.data.user.nickname;
        this.phone = res.data.user.phone;
        this.email = res.data.user.email;
        this.avatar = res.data.user.avatar;
        this.points = res.data.user.points;
        // Cookies.set('username', res.data.user.nickname);
        // Cookies.set('points', res.data.user.points);
    }).catch(error => {

    });

    axios({
        url: 'dbblog/portal/user/operation/operations?type=2',
        method: 'get',
        params: {
            'token': Cookies.get('token')
        }
    }).then(res => {
        //console.log(res.data);
        this.myCount_list = res.data.page.list;
        this.myCount_total = res.data.page.totalCount;
        this.myCount_size = res.data.page.pageSize;
        this.myCount_pageNum = Math.ceil(this.myCount_total / this.myCount_size) || 1;
        for (let i = 0; i < this.myCount_pageNum; i++) {
            this.myCount_totalPage[i] = this.myCount_list.slice(this.myCount_size * i, this.myCount_size * (i + 1))
        }
        this.myCount_showList = this.myCount_totalPage[this.myCount_currentPage-1];
    }).catch(error => {

    });
//我的积分
    axios({
        url: 'http://47.104.148.196:8081/dbblog/portal/user/point/points',
        method: 'get',
        params: {
            'token': Cookies.get('token')
        }
    }).then(res => {
        //console.log(res.data);
        this.point_list = res.data.page.list;
        this.point_total = res.data.page.totalCount;
        this.point_size = res.data.page.pageSize;
        this.point_pageNum = Math.ceil(this.point_total / this.point_size) || 1;
        for (let i = 0; i < this.point_pageNum; i++) {
            this.point_totalPage[i] = this.point_list.slice(this.point_size * i, this.point_size * (i + 1))
        }
        this.point_showList = this.point_totalPage[this.point_currentPage-1];
    }).catch(error => {

    });

    axios({
        url: 'http://47.104.148.196:8081/dbblog/portal/user/operation/operations?type=1',
        method: 'get',
        params: {
            'token': Cookies.get('token')
        }
    }).then(res => {
        // console.log(res.data);
        this.search_list = res.data.page.list;
        this.search_total = res.data.page.totalCount;
        this.search_size = res.data.page.pageSize;
        this.search_pageNum = Math.ceil(this.search_total / this.search_size) || 1;
        for (let i = 0; i < this.search_pageNum; i++) {
            this.search_totalPage[i] = this.search_list.slice(this.search_size * i, this.search_size * (i + 1))
        }
        this.search_showList = this.search_totalPage[this.search_currentPage-1];
    }).catch(error => {

    });
  }
}

</script>
<style lang='less'>
@import '~assets/less/main.less';

.searchBanner {
    background: @mainColor;
    height: 35px;
}

.login {
    bottom: 30px !important;
}

.container {
    min-height: 1000px;
}

.selfInfTitle {
    font-size: 20px;
    color: @mainColor;
    margin-bottom: 10px;
}

#selfInf {
    display: flex;
    height: 100%;
    width: 100%;
}

.selfInfFlex1,
.selfInfFlex2 {
    //border: 1px solid #000;
    height: 400px;
    position: relative;
}

.selfInfFlex1 {
    width: 200px;
}

.selfInfFlex1 a,
.selfInfFlex2 a {
    color: #e98441;
    position: absolute;
}

.selfInfFlex1 a {
    top: 145px;
    left:50%;
    transform: translateX(-50%);
}

.selfInfFlex2 a {
    top: 50px;
    left: 165px;
}

.selfInfFlex2 {
    flex: 1;
    padding-top: 30px;
}

.selfInfImg {
    height: 100px;
    width: 100px; 
    display: block; 
    border-radius: 100%; 
    border: 1px solid #666;
    position: absolute;
    top: 30px;
    left: 50px;
}

.myCount_ul {
    width: 95%;
    margin-bottom: 20px;
    //border: 1px solid #000;
}

.myCount_ul li {
    border-bottom: 1px solid #ccc;
    line-height: 50px;
}

.myCount_pagination {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}

.point_ul {
    width: 95%;
    margin-bottom: 20px;
    //border: 1px solid #000;
}

.point_ul li {
    border-bottom: 1px solid #ccc;
    line-height: 50px;
}

.point_pagination {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}

.search_ul {
    width: 95%;
    margin-bottom: 20px;
    //border: 1px solid #000;
}

.search_ul li {
    border-bottom: 1px solid #ccc;
    line-height: 50px;
}

.search_pagination {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
