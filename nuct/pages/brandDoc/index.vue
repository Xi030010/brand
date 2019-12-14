<!--  -->
<template>
<div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <div class="brandConnect">
        <div class="brandCondition">
            <div style="margin-bottom: 10px;">
                <span style="display: inline-block; width: 9px; height: 15px; background: #6b2049; margin-right: 5px;margin-top: -6px;vertical-align: middle;"></span>
                分类：<span>全部</span><span @click="tran">工业品牌</span><span @click="tran">食品品牌</span>
            </div>
            <div style="margin-bottom: 10px;">
                <span style="display: inline-block; width: 9px; height: 15px; background: #6b2049; margin-right: 5px;margin-top: -6px;vertical-align: middle;"></span>
                领域：<span @click="tran">全部</span><span @click="tran" v-for="(item, i) in factor" :key="i">{{ item.name }}</span>
            </div>
            <div>
                <span style="display: inline-block; width: 9px; height: 15px; background: #6b2049; margin-right: 5px;margin-top: -6px;vertical-align: middle;"></span>
                关键词搜索：
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width: 500px;">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <hr>
        <div>
            <div style="margin-bottom: 10px;">
            已选条件: 
            <el-tag v-for="tag in brandCondition" :key="tag"
              closable
              :disable-transitions="true"
              @close="tagClose(tag)" 
              :style="{display: show}">
                {{ tag }}
            </el-tag>
            </div>
            <div class="left">
              <div v-for = "(item, i) in showList" :key = "i" class="question-item">
                <div class="question-item-content">
                  <a class="questionTitle" @click="turnInfor(item.id, item.ossResource.name)">{{ item.title }}</a>
                  <p class="questionInf">{{ item.description }}</p>
                  <p class="questionTime">资源大小：<span>900KB</span>上传时间：<span>{{ item.createTime }}</span>上传者：

                  <span>Mr.Boring</span></p>
                  
                </div>
                <hr>
              </div>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="size"
                :current-page="currentPage"
                @current-change="consoleCurr"
                style="position: relative;transform: translateX(0);left: 0;bottom: 0">
              </el-pagination>
            </div>
            <div class="right">
                <div class="myAnswer">
                    <div class="userPic">
                        <div class="selfPic"></div>
                        <div>
                            <p style="color: #3399ff;font-size: 18px;">{{ this.username }}</p>
                            <p style="color: #666;font-size:18px;">积分：<span style="color: red">{{ this.points }}</span></p>
                        </div>
                    </div>
                    <p>上传了<span>{{ uploadNum }}</span>个资源</p>
                    <p>下载了<span>{{ downloadNum }}</span>个资源</p>
                    <el-button type="primary" style="width: 100%;margin-top: 20px;" @click="turnUrl">上传资源</el-button>
                </div>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>热门标签</span>
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
      uploadNum: Cookies.get('uploadNum'),
      downloadNum: Cookies.get('downloadNum'),
      input: '',
      factor: [],
      brandCondition: [],
      show: 'none',
      input3: '',
      username: Cookies.get('username'),
      points: Cookies.get('points'),
      list: [],    
      total: 3,
      size: 6,
      currentPage: 1,
      pageNum: 0,  
      totalPage: [],
      showList: [],
    };
  },
  components: {
      login,
      footerBar,
      navbar,
      search,
  },
//   mounted() {
//       console.log(Cookies.get('username'));
//   },

  methods: {
    tran (e) {
      let s = new Set();
      if(e.target.innerText == '全部') {
          for(let i = 0; i < this.factor.length; i++){
              this.brandCondition.push(this.factor[i].name);
          }
      }else {
          this.brandCondition.push(e.target.innerText);
      }
      
      this.brandCondition.forEach(element => s.add(element));
      s = [...s];
      this.brandCondition.splice(0, this.brandCondition.length);
      for(let j = 0; j < s.length; j++){
          this.brandCondition.push(s[j]);
      }
    },

    tagClose (tag) {
      this.brandCondition.splice(this.brandCondition.indexOf(tag), 1);
    },

    turnUrl () {
      location.href = "/uploadDoc";
    },

    turnInfor (id, fileName) {
      this.$router.push({
        path: '../docInfor',
        //name: 'mallList',
        query: {
          mallCode: id,
          fileName: fileName
        }
      })
    },
    consoleCurr (val) {
      //console.log(`${val}`);
      this.currentPage = val;
      this.showList = this.totalPage[this.currentPage-1];
      //console.log(this.currentPage);
    }

  },

  mounted() {
    axios({
      url: 'dbblog/portal/information/informations',
      method: 'get',
      params: {
        token: Cookies.get('token')
      }
    }).then(res => {
      console.log(res.data);
      // this.total = res.data.page.totalCount;
      this.total = res.data.page.list.length;
      this.size = res.data.page.pageSize;
      this.list = res.data.page.list;
      this.pageNum = Math.ceil(this.total / this.size) || 1;
      for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = this.list.slice(this.size * i, this.size * (i + 1))
      }
      this.showList = this.totalPage[this.currentPage-1];
      //console.log(this.list)
    });

    axios({
      url: 'dbblog/portal/operation/categories',
      method: 'get',
      params: {
        'token': Cookies.get('token'),
        // 'type': 3,
      }
    }).then(res => {
      this.factor = res.data.categoryList
    }).catch(error => {

    });
  },

  updated: function () {
    if(this.brandCondition !== ''){
      this.show = 'inline-block';
    }else{
      this.show = 'none';
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
    padding: 0 40px;
    padding-bottom: 20px;
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

.left,
.right {
    box-shadow: 4px 4px 10px 4px #ccc;
}

.left {
    float: left;
    width: 700px;
    min-height: 800px;
    background: #fff;
    position: relative;
}

.right {
    float: right;
    width: 280px;
    height: 800px;
    background: #fff;
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
}

.questionTitle {
    color: #333333;
    font-size: 20px;
    cursor: pointer;
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

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}

.el-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
}

.question-item {
  .question-item-content {
    padding: 1rem 1rem 0 1rem;
  }
}
</style>