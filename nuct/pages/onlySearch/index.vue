<!-- 单一搜索 -->
<template>
<div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search :keywords="input5" :type="mallCode"></search>
    <div v-if="mallCode === '品牌'" class="showBrand">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>品牌查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="brand">
            <div v-for = "(item, i) in showList" :key="i" @click="turnDetails(item.id, item.name)" class="brand-item"> 
                    <p class="brandTitle">{{ item.name }}</p>
                    <p class="brandIntroduction">{{ item.introduction }}</p>
            </div>
            <!-- <div v-for = "item in 10">
                <p class="brandTitle"></p>
                <p class="brandIntroduction"></p>
            </div> -->
        </div>
        <div v-if="!showList.length" style="text-align: center;">没有找到“{{ input5 }}”相关的数据！</div>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="pageNum"
        :page-size="pageSize"
        :current-page="currentPage"
        :hide-on-single-page="true"
        @current-change="consoleCurr">
        </el-pagination>
    </div>
    <div v-if="mallCode === '资料'" class="showBrand">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资料查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="information" v-if="showList.length">
          <div class="left">
            <div v-for = "(item, i) in showList" :key = "i" class="information-item">
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
              :hide-on-single-page="true"
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
      <div class="topic">
            <div v-for = "(item, i) in showList" :key = "i" class="topic-item">
                <div class="answerNamber">
                    <p>{{ item.commentNum }}</p>
                    <p>回答</p>
                </div>
                <p class="questionTime">
									<span>{{ $convertTime(item.createTime) }} 来自 </span>
									{{ item.createUser }}
									<span v-if="item.reward" style="margin-left: 20px;font-size: 18px;">悬赏</span>
									<span v-if="item.reward" style="margin-left: 5px;color: #ef8b3b">{{ item.point }}</span>
									</p>
                <a class="questionTitle" @click="$router.push({path: '../brandAnswer', query: {topicId: item.id, index: activeIndex}})">
                  {{ item.title }}
                </a>
                <p class="questionInf">{{ item.description }}</p>
                <div class="tags">
									<el-tag v-for="(tag, j) in item.tagList" :key="j">
										{{ tag.name }}
									</el-tag>
                </div>
                <div class="showData">
									<p>浏览<span>{{ item.readNum }}</span></p>
									<p class="collect" @click="collect(item.id, i)">收藏<span>{{ item.likeNum }}</span></p>
									<!-- <p>同问<span>0</span></p> -->
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
          :hide-on-single-page="true"
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

// axios.defaults.baseURL = "http://47.104.148.196:8081/dbblog";

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
        this.setShowList()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.mallCode = this.mallCode || this.$route.query.mallCode

    this.setShowList()
    //   axios.get('/brands/search',{
    //       params: {
    //           keywords: 'http',
    //       }
    //   }).then(res => {
    //       console.log(res.data);
    //   }).catch(error => {
    //     console.log(error);
    // });
  },
  methods: {
    collect (topicId, i) {
			axios({
				method: 'post',
				url: 'portal/topic/topic/like/' + topicId,
				params: {
					token: Cookies.get('token'),
				},
				// data: {
				// 	topicId: topicId
				// }
			}).then(res => {
				console.log(res.data)
				if (res.data.code === 200) {
					this.showList[i].likeNum++
					this.pageList[this.currentPage] = this.showList
				}
			})
		},
    setShowList () {
      if( this.mallCode == "品牌") {
        axios({
          url: 'portal/search/brands/search',
          methods: 'get',
          params: {
            keywords: this.input5,
            token: Cookies.get('token'),
          }
        }).then(res => {
          console.log(res.data)
          this.showList = []
          res.data.brandList = [
              {
                  "id": 1,
                  "name": "歌莉娅",
                  "nameAbbr": "歌莉娅",
                  "nameEn": "GELIYA",
                  "categoryId": "19",
                  "introduction": "歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌莉娅歌",
                  "cover": "http://pvt7whda9.bkt.clouddn.com/brand/20190806/bd374017900b46cb8e7d6ef9ea9cdabc.png",
                  "founder": "歌德",
                  "establishDate": 649868400000,
                  "area": "上海",
                  "createUserId": "7",
                  "createTime": 1566267385000,
                  "categoryListStr": null,
                  "baseSummaryList": null,
                  "tagList": [
                      {
                      "id": 13,
                      "name": "百年传承",
                      "type": 5
                      }
                  ],
                  "brdMean": null,
                  "brdQualityRatio": null,
                  "brdStability": null
              },
              {
                  "id": 2,
                  "name": "耐克",
                  "nameAbbr": "耐克",
                  "nameEn": "NIKE",
                  "categoryId": "19",
                  "introduction": "耐克耐克耐克耐克",
                  "cover": "http://pvt7whda9.bkt.clouddn.com/brand/20190806/bd374017900b46cb8e7d6ef9ea9cdabc.png",
                  "founder": "艾克",
                  "establishDate": 649868400000,
                  "area": "上海",
                  "createUserId": "7",
                  "createTime": 1566267385000,
                  "categoryListStr": null,
                  "baseSummaryList": null,
                  "tagList": [],
                  "brdMean": null,
                  "brdQualityRatio": null,
                  "brdStability": null
              }
          ]
          var brandList = res.data.brandList
          this.pageNum = Math.ceil(res.data.brandList.length / this.pageSize) || 1
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = brandList.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
          this.showList = this.totalPage[this.currentPage - 1];
        }).catch(err => {
          console.log(err)
        })
      }else if (this.mallCode == "资料") {
        axios({
          url: 'portal/search/informations/search',
          methods: 'get',
          params: {
            keywords: this.input5,
            token: Cookies.get('token'),
          }
        }).then(res => {
          console.log(res.data)
          this.showList = []
          // res.data.informationList = [
          //     {
          //         "id": 2,
          //         "title": "资料2",
          //         "description": "资料2",
          //         "categoryId": "10",
          //         "point": 5,
          //         "resourceId": 11,
          //         "recommend": true,
          //         "downloadNum": 0,
          //         "readNum": 0,
          //         "likeNum": 0,
          //         "commentNum": 0,
          //         "createUserId": 7,
          //         "createTime": 1566821731000,
          //         "auditState": 0,
          //         "auditTime": 1566821731000,
          //         "tagList": [
          //             {
          //                 "id": 12,
          //                 "name": "品牌资料",
          //                 "type": 3
          //             }
          //         ],
          //         "categoryListStr": null,
          //         "ossResource": {
          //             "id": 11,
          //             "name": "bb.jpg",
          //             "url": "http://pvt7whda9.bkt.clouddn.com/brand/20190807/fd60bfefcaa64ceba37fc7b7d879d544.jpg",
          //             "size": null,
          //             "type": null
          //         },
          //         "brdCommentList": null,
          //         "createUser": "TA119611405003"
          //     },
          //     {
          //         "id": 1,
          //         "title": "资料1",
          //         "description": "资料1",
          //         "categoryId": "10",
          //         "point": 1,
          //         "resourceId": 10,
          //         "recommend": true,
          //         "downloadNum": 0,
          //         "readNum": 8,
          //         "likeNum": 0,
          //         "commentNum": 0,
          //         "createUserId": 7,
          //         "createTime": 1565757020000,
          //         "auditState": 0,
          //         "auditTime": 1565757020000,
          //         "tagList": [
          //             {
          //                 "id": 12,
          //                 "name": "品牌资料",
          //                 "type": 3
          //             }
          //         ],
          //         "categoryListStr": null,
          //         "ossResource": {
          //             "id": 10,
          //             "name": "bb.jpg",
          //             "url": "http://pvuxgg6gl.bkt.clouddn.com/brand_knowledge/20190807/49ac89850c32433cbdb054955c6f8f3b.jpg",
          //             "size": 100,
          //             "type": "jpg"
          //         },
          //         "brdCommentList": null,
          //         "createUser": "TA119611405003"
          //     }
          // ]

          var informationList = res.data.informationList;
          this.pageNum = Math.ceil(res.data.informationList.length / this.pageSize) || 1;
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = informationList.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
          this.showList = this.totalPage[this.currentPage - 1];
        })
      }else if (this.mallCode == "话题") {
        axios({
          url: 'portal/search/topics/search',
          methods: 'get',
          params: {
            keywords: this.input5,
            token: Cookies.get('token'),
          }
        }).then(res => {
          console.log(res.data)
          this.showList = []
          // res.data.topicList = [
          //     {
          //         "id": 1,
          //         "title": "话题1",
          //         "description": "话题1",
          //         "content": "话题1",
          //         "reward": true,
          //         "point": 1,
          //         "status": false,
          //         "recommend": true,
          //         "readNum": 7,
          //         "likeNum": 0,
          //         "commentNum": 0,
          //         "createUserId": "7",
          //         "createTime": 1565600278000,
          //         "tagList": [],
          //         "brdCommentList": null,
          //         "createUser": "TA119611405003"
          //     },
          //     {
          //         "id": 3,
          //         "title": "话题3",
          //         "description": "话题3",
          //         "content": "话题3",
          //         "reward": false,
          //         "point": 1,
          //         "status": true,
          //         "recommend": false,
          //         "readNum": 0,
          //         "likeNum": 0,
          //         "commentNum": 0,
          //         "createUserId": "7",
          //         "createTime": 1565668132000,
          //         "tagList": [
          //             {
          //                 "id": 11,
          //                 "name": "Java2222",
          //                 "type": 4
          //             }
          //         ],
          //         "brdCommentList": null,
          //         "createUser": "TA119611405003"
          //     }
          // ]

          var topicList = res.data.topicList;
          this.pageNum = Math.ceil(res.data.topicList.length / this.pageSize) || 1;
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = topicList.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
          this.showList = this.totalPage[this.currentPage - 1];
        })
      }
    },
    turnDetails (id, name) {
        this.$router.push({
        path: '../brandInformation',
        // name: 'mallList',
        query: {
          mallCode: id,
          name: name
        }
      })
    },
    turnInfor (id) {
        this.$router.push({
        path: '../docInfor',
        //name: 'mallList',
        query: {
          mallCode: id,
          index: 1
        }
      })
    },
    turnTopic (id) {
        this.$router.push({
        path: '../brandAnswer',
        //name: 'mallList',
        query: {
          topicId: id
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
<style lang='less' scoped>
@import '~assets/less/main.less';
.showBrand {
    position: relative;
    //background: #f5f5f5;
    //margin-top: 50px;
    height: 1000px;
    padding-top: 30px;
}

.Breadcrumb {
    margin-left: 20px;
    margin-bottom: 20px;
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

    .brand-item {
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
        width: 300px;
        height: 200px;
        background: #fff;
        overflow: hidden;
        box-shadow: 4px 4px 10px #ccc;
        cursor: pointer;

        .brandTitle {
            font-weight: 600;
            margin-left: 10px;
            margin-top: 10px;
        }

        .brandIntroduction {
            margin-left: 10px;
            margin-top: 5px;
        }
    }
}

.el-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}

.information {
  .left {
    position: relative;
    width: 80%;
    min-height: 800px;
    background: #fff;
    margin: 30px auto 0;
    box-shadow: 4px 4px 10px 4px #ccc;

    .information-item {
      padding: 10px;

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
    }
  }
}

.topic {
  position: relative;
  min-height: 300px;
  width: 950px;
  margin: 0 auto;
  padding-right: 20px;
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;

  .topic-item {
    margin-top: 30px;

    .answerNamber {
      position: absolute;
      right: 20px;
      width: 80px;
      height: 80px;
      background: #ef8b3b;
      padding-top: 20px;

      p {
        text-align: center;
        color: #fff;
        font-weight: 700;
      }
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

    .showData {
      text-align:right;

      .collect {
        cursor: pointer;

        &:hover {
          color: #ef8b3b;
        }
      }

      p {
        display: inline-block;
        margin-bottom: 5px;
      }
    }
  }
}
</style>