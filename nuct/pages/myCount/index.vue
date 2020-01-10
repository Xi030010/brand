<!-- 我的计算 -->
<template>
<div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <el-tabs @tab-click="handleClick" type="border-card"  :tab-position="tabPosition" style="height: 580px; width: 750px; margin: 20px auto;border-radius: 55px;">
      <el-tab-pane label="个人资料">
          <h1 class="selfInfTitle">个人资料</h1>
          <hr>
          <div id="selfInf">
              <div class="selfInfFlex1">
                  <img :src="this.avatar" class="selfInfImg">
                  <a>修改头像</a>
              </div>
              <div class="selfInfFlex2">
                  <p>ID：<span>{{ this.userId }}</span></p>
                  <p style="margin-bottom: 50px">关注：<span>4</span>&nbsp;&nbsp;&nbsp;&nbsp;积分：<span>{{ points }}</span></p>
                  <a>充值</a>
                  <p>昵称：<span>{{ this.nickname }}</span></p>
                  <p>实名：<span>{{ this.username }}</span></p>
                  <p>手机号：<span>{{ this.phone }}</span></p>
                  <p>邮箱：<span>{{ this.email }}</span></p>
                  <p>积分：<span>{{ this.points }}</span></p>
              </div>
          </div>
      </el-tab-pane>
      <el-tab-pane label="我的计算">
          <ul class="myCount_ul">
              <li v-for="(item,i) in myCount_showList" :key="i">
								{{ item.brandName }} <span style="float: right">{{ $convertTime(item.createTime) }}</span>
							</li>       
          </ul>
          <el-pagination
          small
          layout="prev, pager, next"
          class="myCount_pagination"
          :total="myCount_total"
          :page-size="myCount_size"
          :current-page="myCount_currentPage"
          :hide-on-single-page="true"
          @current-change="myCount_consoleCurr">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="我的查询">
          <ul class="search_ul">
              <li v-for="(item,i) in search_showList" :key="i">{{ item.brandName }} <span style="float: right">{{ $convertTime(item.createTime) }}</span></li>       
          </ul>
          <el-pagination
          small
          layout="prev, pager, next"
          class="search_pagination"
          :total="search_total"
          :page-size="search_size"
          :current-page="search_currentPage"
          :hide-on-single-page="true"
          @current-change="search_consoleCurr">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="我的积分">
          <!-- <ul class="point_ul">
              <li v-for="(item,i) in point_showList" :key="i">
								{{ item.remark }} {{ item.points }} <span style="float: right">{{ $convertTime(item.createTime) }}</span>
							</li>       
          </ul> -->
					<div class="point-head">
						<span class="point-head-title">我的积分</span>
						<span style="font-size: 13px;">当前积分</span>
						<span class="point-head-point">{{ points }}</span>
						<el-button class="point-head-recharge" size="mini">积分充值</el-button>
					</div>
					<hr style="margin-bottom: 20px;">
					<el-tabs type="border-card" class="point-tabs">
						<el-tab-pane label="积分明细">
							<el-table
								:data="showList"
								style="width: 100%">
								<el-table-column
									prop="point"
									label="分数"
									width="80">
								</el-table-column>
								<el-table-column
									prop="time"
									label="时间"
									width="150">
								</el-table-column>
								<el-table-column
									prop="resource"
									label="资源"
								>
								</el-table-column>
								<el-table-column
									prop="type"
									label=""
									width="120"
									align="right"
								>
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="充值记录">充值记录</el-tab-pane>
					</el-tabs>
          <el-pagination
          small
					background
          layout="prev, pager, next"
          class="point_pagination"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          :hide-on-single-page="true"
          @current-change="consoleCurr">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="我的资源">
        <!-- <MyResource></MyResource> -->
      </el-tab-pane>
    </el-tabs>
    <footerBar  style="width: 1080px; margin-top: 30px;"></footerBar>
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
			total: 3,
      pageSize: 6,
      currentPage: 1,
      pageNum: 0,
      showList: [],
      pageList: [],
			userId: Cookies.get('userId'),
      nickname: Cookies.get('nickname'),
			username: Cookies.get('username'),
			phone: Cookies.get('phone'),
			email: Cookies.get('email'),
			avatar: Cookies.get('avatar'),
			points: Cookies.get('points'),
      // avatar: 'img/selfInfText.jpg',

			tabPosition: 'left',
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

  mounted() {
		// 我的计算
		this.setCountList(1)
		
		//我的积分
    this.setShowList(1)

		// 我的查询
    this.setSearchList(1)
	},
	
	methods: {
		setCountList (currentPage) {
			axios({
					url: 'portal/user/operation/operations?type=2',
					method: 'get',
					params: {
            token: Cookies.get('token'),
            page: currentPage
					}
			}).then(res => {
					//console.log(res.data);
					this.myCount_showList = res.data.page.list
					this.myCount_total = res.data.page.totalCount
					this.myCount_size = res.data.page.pageSize
					this.myCount_pageNum = Math.ceil(this.myCount_total / this.myCount_size) || 1
					this.myCount_totalPage[currentPage] = this.myCount_showList

					// this.myCount_list = res.data.page.list;
					// this.myCount_total = res.data.page.totalCount;
					// this.myCount_size = res.data.page.pageSize;
					// this.myCount_pageNum = Math.ceil(this.myCount_total / this.myCount_size) || 1;
					// for (let i = 0; i < this.myCount_pageNum; i++) {
					// 		this.myCount_totalPage[i] = this.myCount_list.slice(this.myCount_size * i, this.myCount_size * (i + 1))
					// }
					// this.myCount_showList = this.myCount_totalPage[this.myCount_currentPage-1];
			}).catch(error => {

			});
		},
		setSearchList (currentPage) {
			axios({
					url: 'portal/user/operation/operations?type=1',
					method: 'get',
					params: {
							'token': Cookies.get('token'),
							page: currentPage
					}
			}).then(res => {
					// console.log(res.data);
					this.search_showList = res.data.page.list
					this.search_total = res.data.page.totalCount
					this.search_size = res.data.page.pageSize
					this.search_pageNum = Math.ceil(this.search_total / this.search_size) || 1
					this.search_totalPage[currentPage] = this.search_showList

					// this.search_list = res.data.page.list;
					// this.search_total = res.data.page.totalCount;
					// this.search_size = res.data.page.pageSize;
					// this.search_pageNum = Math.ceil(this.search_total / this.search_size) || 1;
					// for (let i = 0; i < this.search_pageNum; i++) {
					//     this.search_totalPage[i] = this.search_list.slice(this.search_size * i, this.search_size * (i + 1))
					// }
					// this.search_showList = this.search_totalPage[this.search_currentPage-1];
			}).catch(error => {

			});
		},
		setShowList (currentPage) {
			axios({
        url: 'portal/user/point/points',
        method: 'get',
        params: {
					token: Cookies.get('token'),
					page: currentPage
        }
			}).then(res => {
					console.log(res.data)
					// this.point_list = res.data.page.list;
					// this.point_total = res.data.page.totalCount;
					// this.point_size = res.data.page.pageSize;
					// this.point_pageNum = Math.ceil(this.point_total / this.point_size) || 1;
					// for (let i = 0; i < this.point_pageNum; i++) {
					//     this.point_totalPage[i] = this.point_list.slice(this.point_size * i, this.point_size * (i + 1))
					// }
					// this.point_showList = this.point_totalPage[this.point_currentPage-1];
					for (var i = 0; i < res.data.page.list.length; i++) {
						var curItem = res.data.page.list[i]
						var temp = {}
						if (curItem.type == 1) {
							temp.type = '+ '
						}
						else if (curItem.type == 2) {
							temp.type = '- '
						}
						if (curItem.businessType == 1) {
							temp.type += '下载获取'
						}
						else if (curItem.businessType == 2) {
							temp.type += '下载扣减'
						}
						else if (curItem.businessType == 3) {
							temp.type += '充值'
						}
						temp.point = curItem.points
						temp.time = this.$convertTime(curItem.createTime)
						temp.resource = curItem.remark
						this.showList.push(temp)
					}
					this.total = res.data.page.totalCount
          this.pageSize = res.data.page.pageSize
					this.pageNum = Math.ceil(this.total / this.pageSize) || 1
					this.pageList[currentPage] = this.showList
			}).catch(error => {
				console.log(error)
			});
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
    },
		handleClick (tab, e) {
      this.currentPage = 1
			if (tab.label === '我的资源') {
				axios()
				this.$router.push({path: './docInfor', query: {mallCode: 1, index: 2}})
			}
		},
    myCount_consoleCurr (currentPage) {
				//console.log(`${val}`);
				this.currentPage = currentPage;
				if (!this.myCount_totalPage[currentPage]) {
					this.setCountList(currentPage)
				}
				else {
					this.myCount_showList = this.myCount_totalPage[currentPage]
				}
        // this.myCount_currentPage = val;
        // this.myCount_showList = this.myCount_totalPage[this.myCount_currentPage-1];
        //console.log(this.currentPage);
    },

		point_consoleCurr (val) {
			//console.log(`${val}`);
			this.point_currentPage = val;
			this.point_showList = this.point_totalPage[this.point_currentPage-1];
			//console.log(this.currentPage);
    },

		search_consoleCurr (currentPage) {
			//console.log(`${val}`);
			this.currentPage = currentPage;
			if (!this.search_totalPage[currentPage]) {
				this.setSearchList(currentPage)
			}
			else {
				this.search_list = this.search_totalPage[currentPage]
			}
			// this.search_currentPage = val;
			// this.search_showList = this.search_totalPage[this.search_currentPage-1];
			//console.log(this.currentPage);
    }
  },
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
    // min-height: 1000px;
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

.point-head {
	// margin-bottom: 20px;

	.point-head-title {
		font-size: 20px;
		font-weight: bold;
		margin-right: 10px;
	}

	.point-head-point {
		color: red;
	}

	.point-head-recharge {
		margin-left: 320px;
	}
}

.point-tabs {
	margin-bottom: 30px;
}

.el-tabs--left, .el-tabs--right {
  overflow: auto;
}
</style>
