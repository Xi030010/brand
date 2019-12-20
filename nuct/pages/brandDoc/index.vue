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
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资料列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="brandCondition">
            <!-- <div style="margin-bottom: 10px;">
                <span style="display: inline-block; width: 9px; height: 15px; background: #6b2049; margin-right: 5px;margin-top: -6px;vertical-align: middle;"></span>
                分类：<span>全部</span><span @click="tran">工业品牌</span><span @click="tran">食品品牌</span>
            </div> -->
            <div>
                <span style="display: inline-block; width: 9px; height: 15px; background: #6b2049; margin-right: 5px;margin-top: -6px;vertical-align: middle;"></span>
                分类：
                <span @click="tran($event, '')">全部</span>
                <span @click="tran($event, item.id)" v-for="(item, i) in factor" :key="i">
                  {{ item.name }}
                </span>
            </div>
            <!-- <div>
                <span style="display: inline-block; width: 9px; height: 15px; background: #6b2049; margin-right: 5px;margin-top: -6px;vertical-align: middle;"></span>
                关键词搜索：
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width: 500px;">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div> -->
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
              <div v-for = "(item, i) in showList" :key = "i">
                <div class="question-item clearfix">
                  <div class="question-item-left">
                    <div class="left-img">
                      <div class="white-rectangle"></div>
                      <div class="triangle"></div>
                      <div class="shelter-edge"></div>
                      <div style="position: absolute;bottom: 25%;color: white;left: 50%;transform: translateX(-50%);font-weight: bold;">
                        {{ item.ossResource ? item.ossResource.type.replace('image/', '') : 'DOC' }}
                    </div>
                    </div>
                  </div>
                  <div class="question-item-right">
                    <a class="questionTitle" @click="turnInfor(item.id, item.ossResource && item.ossResource.name, item.title)">{{ item.title }}</a>
                    <p class="questionInf">{{ item.description || '' }}</p>
                    <p class="questionTime">
                      资源大小：<span>{{ item.ossResource ? item.ossResource.size : 900 }}KB</span>上传时间：<span>{{ $convertTime(item.createTime) }}</span>
                      上传者：<span>{{ item.createUser }}</span>
                    </p>
                  </div>
                </div>
                <hr>
              </div>

              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="consoleCurr"
                style="position: relative;transform: translateX(0);left: 0;bottom: 0;margin: 20px 0;text-align: center;">
              </el-pagination>
            </div>
            <div class="right">
                <div class="myAnswer">
                    <div class="userPic">
                        <div class="selfPic"></div>
                        <div>
                            <p class="purple" style="font-size: 18px;">{{ this.nickname }}</p>
                            <p style="color: #666;font-size:18px;">积分：<span class="purple">{{ this.points }}</span></p>
                        </div>
                    </div>
                    <p>上传了<span class="purple">{{ uploadNum }}</span>个资源</p>
                    <p>下载了<span class="purple">{{ downloadNum }}</span>个资源</p>
                    <el-button type="primary" style="width: 100%;height: 30px;margin-top: 20px;" @click="turnUrl">上传资源</el-button>
                </div>
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>热门标签</span>
                        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                    </div>
                    <div style="text-align: center;">
                      <el-tag v-for="(item, i) in hotTags" :key="i" class="text item" style="margin: 0 5px;padding: 0 10px;">
                        {{ item.name }}
                      </el-tag>
                    </div>
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
      nickname: Cookies.get('nickname'),
      points: Cookies.get('points'),  
      total: 3,
      pageSize: 6,
      currentPage: 1,
      pageNum: 0,  
      totalPage: [],
      showList: [],
      pageList: [],
      hotTags: [],
    };
  },
  components: {
      login,
      footerBar,
      navbar,
      search,
  },
  mounted() {
    this.setShowList(1)

    axios({
      url: 'portal/operation/categories',
      method: 'get',
      params: {
        'token': Cookies.get('token'),
        'type': 3,
      }
    }).then(res => {
      console.log(res.data)
      this.factor = res.data.categoryList
    }).catch(error => {
      console.log(error)
    });

    axios({
      method: 'get',
      url: 'portal/operation/tags/3',
      params: {
        token: Cookies.get('token')
      }
    }).then(res => {
      console.log(res.data)
      this.hotTags = res.data.tagList
    })
  },
  updated: function () {
    if(this.brandCondition !== ''){
      this.show = 'inline-block';
    }else{
      this.show = 'none';
    }
  },
  methods: {
    setShowList (currentPage, cateId) {
      axios({
        url: 'portal/information/informations',
        method: 'get',
        params: {
          token: Cookies.get('token'),
          limit: 10,
          page: currentPage,
          categoryId: cateId,
        }
      }).then(res => {
        console.log(res.data);
        this.total = res.data.page.totalCount;
        this.pageSize = res.data.page.pageSize;
        this.showList = res.data.page.list;
        this.pageNum = Math.ceil(this.total / this.pageSize) || 1;
        // for (let i = 0; i < this.pageNum; i++) {
        //     this.totalPage[i] = this.list.slice(this.pageSize * i, this.pageSize * (i + 1))
        // }
        // this.showList = this.totalPage[this.currentPage - 1];
        this.pageList[currentPage] = this.showList
      });
    },
    tran (e, cateId) {
      console.log(cateId)
      let s = new Set();
      if(e.target.innerText == '全部') {
        this.brandCondition = []
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

      this.setShowList(1, cateId)
    },

    tagClose (tag) {
      this.brandCondition.splice(this.brandCondition.indexOf(tag), 1);
      this.setShowList(1, '')
    },

    turnUrl () {
      location.href = "/uploadDoc";
    },

    turnInfor (id, fileName, title) {
      this.$router.push({
        path: '../docInfor',
        //name: 'mallList',
        query: {
          mallCode: id,
          index: 1
          // fileName: fileName,
          // title: title,
        }
      })
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
  },
}

</script>
<style lang='less' scoped>
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
    margin-top: 30px;
}

.brandCondition {
    background: #fff;
    width: 1000px;
    min-height: 50px;
    margin: 20px auto 20px;
    padding: 10px;
}

.brandCondition span {
    margin: 0px 10px;
    cursor: pointer;
}

.brandCondition span:hover {
    color: #6b2048;
}

.showCondition {
    display: inline-block;
    border: 1px solid #6b2048;
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
    min-height: 800px;
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
    min-height: 20px;
    color: #6a6f6f;
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 10px;
}

.questionTime span {
    margin: 0 15px 0 0;
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

  .question-item-left {
    position: relative;
    float: left;
    width: 15%;
    min-height: 120px;

    .left-img {
      position: absolute;
      width: 70px;
      height: 80px;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #6b2048;

      .white-rectangle {
        position: absolute;
        right: 0;
        top: 0;
        border: 12px solid white;
      }

      .triangle {
        position: absolute;
        right: 0;
        top: 0;
        border-left: 11px solid #6b2048;
        border-bottom: 11px solid #6b2048;
        border-top: 11px solid white;
        border-right: 11px solid white;
      }

      .shelter-edge {
        position: absolute;
        right: -9px;
        top: 0;
        border: 12px solid white;
        border-left-width: 5px;
        border-right-width: 5px;
      }
    }
  }

  .question-item-right {
    float: right;
    width: 85%;
    min-height: 120px;
    padding: 1rem 1rem 0 0;
  }
}
</style>