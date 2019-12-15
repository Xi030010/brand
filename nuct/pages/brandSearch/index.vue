<!--  -->
<template>
<div class="container" v-loading="loading">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <!-- <div class="navFixed">
        <login></login>
        <search></search>
    </div> -->
    <!--<navbar></navbar>-->
    <!--<el-button type="primary" @click="turnOnlySearch" style="position: fixed;right: 300px;z-index: 100;">品牌搜索</el-button>-->
    <div class="showBrand">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="condition">
            <p style="margin-left: 15px; margin-bottom: 20px;">
              <span style="display: inline-block; width: 9px; height: 15px; background: #6b2049; margin-right: 5px;margin-top: -6px;vertical-align: middle;">
               </span>
               筛选条件：
            </p>
            <div v-for = "(item, i) in factor" :key="i">
              <a class="conditionP" @click="condition(item.id)">{{ item.name }}</a>
            </div>
        </div>
        <hr>
        <div class="brand">
          <div v-for = "(item, i) in showList" :key="i" @click="turnDetails(1, item.name)" style="cursor: pointer;">
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
        :total="total"
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

//axios.defaults.baseURL = "http://47.104.148.196:8081/dbblog";

export default {
  middleware: 'auth',
  data () {
    return {
        input: '',
        factor: ['服装','手机','电脑'],
        loading: true,
        total: 3,
        pageSize: 6,
        currentPage: 1,
        pageNum: 0,
        list: [],
        totalPage: [],
        showList: [],
        pageList: [],
    };
  },
  components: {
      login,
      footerBar,
      navbar,
      search,
  },


  mounted() {
    this.setShowList(null, 1)

    axios({
      url: 'dbblog/portal/operation/categories',
      method: 'get',
      params: {
        'token': Cookies.get('token'),
        'type': 5,
      }
    }).then(res => {
      console.log(res.data)
      this.factor = res.data.categoryList
      
    }).catch(error => {

    });
  },

  updated() {
      // for(let i of this.list) {
      //     this.showList.push(i);
      // }
  },
    
//     async asyncData() {
//         //axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8;';
//     await axios({
//         url: 'http://47.104.148.196:8081/dbblog/portal/brand/brands',
//         method: 'get',
//         params: {
//             'token': 'f7de26bf1b125a5bc2877b76d364bae9'
//         }
//     }).then(res => {
//         console.log(res.data);
//         return{
//             loading: false,
//             list: res.data.page.list
//         }
//     }).catch(error => {
//         console.log(error)
//     });
//    },

    // mounted() {
    //     //console.log(JSON.parse(localStorage.getItem(token)));
    //     console.log(this.$store.getters.getToken);
    //     console.log(Cookies.get('token'));
    // },

  methods: {
    setShowList(cateId, currentPage) {
      axios({
        url: 'dbblog/portal/brand/brands',
        method: 'get',
        params: {
          token: Cookies.get('token'),
          limit: 10,
          page: currentPage,
          categoryId: cateId,
        }
      }).then(res => {
        console.log(res.data)
        //this.currentPage = res.data.page.currPage;
        this.loading = false;
        this.total = res.data.page.totalCount;
        this.pageSize = res.data.page.pageSize;
        this.showList = res.data.page.list;
        this.pageNum = Math.ceil(this.total / this.pageSize) || 1;
        this.pageList[currentPage] = this.showList
      }).catch(error => {

      });
    },
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
    turnOnlySearch () {
      location.href = "../onlySearch";
    },
    condition (id) {
      this.setShowList(id, 1)
    },
    consoleCurr (currentPage) {
      //console.log(`${val}`);
      this.currentPage = currentPage;
      if (!this.pageList[currentPage]) {
        this.setShowList(currentPage)
      }
      else {
        this.showList = this.pageList[currentPage]
      }
      //console.log(this.currentPage);
    }
  }
}

</script>
<style lang='less'>
@import '~assets/less/main.less';
.showBrand {
    position: relative;
    //margin-top: 30px;
    min-height: 800px;
    padding-top: 30px;
}

.Breadcrumb {
    margin-left: 20px;
    margin-bottom: 50px;
}

.condition {
    height: 100px;
    width: 980px;
    margin: 0 auto 15px;
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
    box-shadow: 4px 4px 10px #ccc;
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

.conditionP {
    float: left;
    margin-left: 35px;
    line-height: 30px;
    color: #000;
    cursor: pointer;
}

.conditionP:hover {
    color: #ef8b3b;
}

.navFixed {
    width: 1080px;
    height: 100px;
    background: #fff;
    position: fixed;
    z-index: 3;
    top: 0;
}

.container {
    //padding-top: 100px;
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}
</style>