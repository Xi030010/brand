<!-- 资料详情 -->
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
                <el-breadcrumb-item :to="{ path: '/brandDoc' }">品牌资料</el-breadcrumb-item>
                <el-breadcrumb-item>{{ downLoadFile.title }}</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="left">
							<div>
								<el-tabs v-model="activeName1" @tab-click="handleClick1">
									<el-tab-pane label="下载首页" name="first">
										<el-tabs v-model="activeName2">
											<el-breadcrumb separator="/" style="margin-bottom: 20px;">
												<el-breadcrumb-item>下载</el-breadcrumb-item>
												<el-breadcrumb-item>测试分类</el-breadcrumb-item>
												<el-breadcrumb-item>{{ downLoadFile.title }}</el-breadcrumb-item>
											</el-breadcrumb>
											<hr>
											<div class="current-download">
												<div class="question-left">
													<img src="" alt="">
												</div>
												<div class="question-right">
													<a class="questionTitle">{{ downLoadFile.title }}</a>
													<p class="questionInf">{{ downLoadFile.description }}</p>
												</div>
												<p class="questionTime">资源大小：<span>{{ downLoadFile.ossResource.size }}KB</span>上传时间：<span>{{ $convertTime(downLoadFile.createTime) }}</span></p>
												<span style="margin-right: 150px;">所需积分：5</span>
												<el-button @click="downLoad">立即下载</el-button>
											</div>
											<hr>
											<div class="moreDownload">
													<div class="current-download">
															<div>
																	<a class="questionTitle">刷机教程.doc——三星GT-I9070线刷教程</a>
																	<p class="questionInf">想要刷机但是没有尝试过刷机的三星小伙伴们可以参考一下本教程。</p>
																	<p class="questionTime">资源大小：<span>900KB</span>上传时间：<span>2019-07-15</span></p>
															</div>
															<el-link :underline="false" class="moreDownBtn" @click="downLoad">立即下载</el-link>
													</div>
													<hr style="border: 1px dotted #ccc;">
											</div>
										</el-tabs>
									</el-tab-pane>
									<el-tab-pane label="我的资源" name="second">
										<el-tabs v-model="activeName2" @tab-click="handleClick2">
												<el-tab-pane label="上传明细" name="first">
														<div v-for="(item, i) in showList" :key="i" class="current-download">
																<div style="width: 500px">
																		<a class="questionTitle">{{ item.title }}</a>
																		<p class="questionInf">{{ item.description }}</p>
																		<el-button class="questionButton" size="mini" v-for="(tagItem, j) in item.tagList" :key="j">
																			{{ tagItem.name }}
																		</el-button>
																		<p class="questionTime">上传时间：<span>{{ $convertTime(item.createTime) }}</span>所需积分：<span>5</span></p>
																</div>
																<p class="moreDownBtnUp">已通过</p>
																<el-link :underline="false" class="moreDownBtn">编辑</el-link>
														</div>
														<hr style="border: 1px dotted #ccc;">
												</el-tab-pane>
												<el-tab-pane label="下载明细" name="second">
													<div v-for="(item, i) in showList" :key="i">
															<div style="width: 500px">
																	<a class="questionTitle">{{ item.title }}</a>
																	<p class="questionInf">{{ item.description }}</p>
																	<el-button class="questionButton" size="mini" v-for="(tagItem, j) in item.tagList" :key="j">
																		{{ tagItem.name }}
																	</el-button>
																	<p class="questionTime">上传时间：<span>{{ $convertTime(item.createTime) }}</span>所需积分：<span>5</span></p>
															</div>
															<el-link :underline="false" class="moreDownBtnUp">立即评价</el-link>
															<hr style="border: 1px dotted #ccc;">
													</div>
												</el-tab-pane>
										</el-tabs>
										<el-pagination
											layout="prev, pager, next"
											:page-size="pageSize"
											:page-count="pageNum"
											:hide-on-single-page="true"
											@current-change="consoleCurr"
											style="position: relative;left: 0;bottom: 0;transform: translateX(0);width: 50%;margin: 0 auto">
										</el-pagination>
									</el-tab-pane>
									<!-- <el-tab-pane label="已下载" name="second"></el-tab-pane>
									<el-tab-pane label="上传资源" name="third"></el-tab-pane> -->
								</el-tabs>
							</div>
            </div>
            <div class="right">
                <div class="myAnswer">
                    <div class="userPic">
                        <div class="selfPic"></div>
                        <div>
                            <p style="color: #3399ff;font-size: 18px;">用户</p>
                            <p style="color: #666;font-size:18px;">积分：<span style="color: red">{{ points }}</span></p>
                        </div>
                    </div>
                    <p>上传了<span>{{ uploadNum }}</span>个资源</p>
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
			uploadNum: Cookies.get('uploadNum'),
			downloadNum: Cookies.get('downloadNum'),
			points: Cookies.get('points'),
      brandCondition: [],
      show: 'none',
      input3: '',
      score: '3',
      selfScore: '41',
      fileName: null,
			title: null,
			activeName1: 'first',
      activeName2: 'first',
			pageSize: null,
      pageNum: null,
      totalPage: [],
      currentPage: 1,
			showList: null,
			downLoadFile: {},
    };
  },

  beforeMount () {
		//console.log(this.$route.query.mallCode)
		// this.fileName = this.$route.query.fileName
		// this.title = this.$route.query.title
		axios({
			url: 'dbblog/portal/information/information/' + this.$route.query.mallCode,
			method: 'get',
			params: {
					token: Cookies.get('token')
			}
		}).then(res => {
			console.log(res.data.brdInformation);
			this.downLoadFile = res.data.brdInformation;
			this.title = res.data.brdInformation.title;
		});

		this.getDownList()
  },

  methods: {
		getDownList () {
			// 下载资料
			axios({
				method: 'get',
				url: 'dbblog/portal/user/information/informations',
				params: {
					token: Cookies.get('token'),
					userId: 7,
					type: 2
				}
			}).then(res => {
				console.log(res.data)
				var list = res.data.page.list;
				this.pageSize = res.data.page.pageSize;
				this.pageNum = Math.ceil(list.length / this.pageSize) || 1;
				for (let i = 0; i < this.pageNum; i++) {
					this.totalPage[i] = list.slice(this.pageSize * i, this.pageSize * (i + 1))
				}
				this.showList = this.totalPage[this.currentPage - 1];
			})
		},
		getUploadList () {
			// 上传资料
			axios({
			  method: 'get',
			  url: 'dbblog/portal/user/information/informations',
			  params: {
			    token: Cookies.get('token'),
			    userId: 7,
			    type: 1
			  }
			}).then(res => {
			  console.log(res.data)
			  var list = res.data.page.list;
			  this.pageSize = res.data.page.pageSize;
			  this.pageNum = Math.ceil(list.length / this.pageSize) || 1;
			  for (let i = 0; i < this.pageNum; i++) {
			    this.totalPage[i] = list.slice(this.pageSize * i, this.pageSize * (i + 1))
			  }
			  this.showList = this.totalPage[this.currentPage - 1];
			})
		},
		// 下载首页和我的资源tab页切换
		handleClick1 (tab) {
			console.log(tab)
			if (tab.name === 'second') {
				this.getUploadList()
			}
			else if (tab.name === 'first') {
				this.getDownList()
			}
		},
		// 我的资源tab页下，子tab页切换
		handleClick2 (tab) {
			console.log(tab)
			if (tab.name === 'first') {
				this.getUploadList()
			}
			else if (tab.name === 'second') {
				this.getDownList()
			}
		},
		downLoad () {
			this.$confirm('当前积分' + this.points + ', 需扣除积分' + 5 + ', 是否确定下载?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				window.open('http://47.104.148.196:8081/dbblog/portal/file/downloadFile/'
										+ this.fileName + '?token=' + Cookies.get('token'), '_blank')
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消下载'
				});          
			});
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
.container {
    position: relative;
}

.brandConnect {
    overflow: hidden;
    //background: #f5f5f5;
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

.left,
.right {
    box-shadow: 4px 4px 10px 4px #ccc;
}

.left {
	box-sizing: border-box;
	float: left;
	width: 700px;
	min-height: 800px;
	margin-top: 20px;
	padding: 0 20px;
	// background: grey;
	
	.container {
		width: 700px;
		min-height: 800px;
		background-color: white;
	}
}

.right {
    float: right;
    width: 280px;
    min-height: 800px;
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
    margin: 10px 0;
    //text-align: right;
}

.questionTitle {
    color: #333333;
    font-size: 20px;   
}

.questionInf {
    width: 80%;
    color: #6a6f6f;
    margin: 10px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.questionTime span {
    margin: 0 30px 0 0;
}

.current-download {
	padding: 0 20px;
}

.moreDownload {
    margin-top: 70px;
    overflow: hidden;
    position: relative;
}

.moreDownBtn {
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translateY(-50%);
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}
</style>