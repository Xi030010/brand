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
                <!-- <el-breadcrumb-item>{{ downLoadFile.title }}</el-breadcrumb-item> -->
								<el-breadcrumb-item>{{ activeName1 == 'first' ? '下载首页' : '我的资源' }}</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="left">
							<div>
								<el-tabs v-model="activeName1" @tab-click="handleClick1">
									<el-tab-pane label="下载首页" name="first">
										<el-tabs v-model="activeName2">
											<el-breadcrumb separator="/" style="margin-bottom: 20px;">
												<el-breadcrumb-item>下载</el-breadcrumb-item>
												<!-- <el-breadcrumb-item>测试分类</el-breadcrumb-item> -->
												<el-breadcrumb-item v-if="!noId">{{ downLoadFile.title }}</el-breadcrumb-item>
											</el-breadcrumb>
											<hr>
											<div v-if="!noId" class="current-download">
												<div class="question-item clearfix">
													<div class="question-item-left">
														<div class="left-img">
															<div class="white-rectangle"></div>
															<div class="triangle"></div>
															<div class="shelter-edge"></div>
															<div style="position: absolute;bottom: 25%;color: white;left: 50%;transform: translateX(-50%);font-weight: bold;">
																{{ getFileType(downLoadFile) }}
														</div>
														</div>
													</div>
													<div class="question-item-right" style="margin-bottom: 10px;">
														<a class="questionTitle">{{ downLoadFile.title }}</a>
														<p class="questionInf">{{ downLoadFile.description || '' }}</p>
														<p class="questionTime">资源大小：
															<span>
																{{ downLoadFile.ossResource ? downLoadFile.ossResource.size : 900}}KB
															</span>
															上传时间：
															<span>
																{{ downLoadFile.createTime ? $convertTime(downLoadFile.createTime) : '' }}
															</span>
														</p>
														<span style="margin-left: -85px; margin-right: 150px;">所需积分：{{ downLoadFile.point }}</span>
														<el-button @click="downLoad(downLoadFile)" class="moreDownBtn">立即下载</el-button>
													</div>
												</div>
											</div>
											<hr v-if="!noId">
											<div class="moreDownload" v-if="showList.length" :style="{marginTop: noId ? '0' : '70px'}">
												<div v-for="(item, i) in showList" :key="i" class="current-download">
													<div class="question-item clearfix">
														<div class="question-item-left">
															<div class="left-img">
																<div class="white-rectangle"></div>
																<div class="triangle"></div>
																<div class="shelter-edge"></div>
																<div style="position: absolute;bottom: 25%;color: white;left: 50%;transform: translateX(-50%);font-weight: bold;">
																	{{ getFileType(item) }}
															</div>
															</div>
														</div>
														<div class="question-item-right">
															<a class="questionTitle">{{ item.title }}</a>
															<p class="questionInf">{{ item.description || '' }}</p>
															<p class="questionTime">资源大小：<span>{{ item.ossResource ? item.ossResource.size : 900 }}KB</span>上传时间：<span>{{ item.createTime ? $convertTime(item.createTime) : '' }}</span></p>
															<el-button class="moreDownBtn" @click="downLoad(item)">立即下载</el-button>
														</div>
													</div>
													<hr style="border: 1px dotted #ccc;margin-top: 0;">
												</div>
											</div>
										</el-tabs>
									</el-tab-pane>
									<el-tab-pane label="我的资源" name="second">
										<el-tabs v-model="activeName2" @tab-click="handleClick2">
												<el-tab-pane label="上传明细" name="first">
														<div v-for="(item, i) in showList" :key="i" class="current-download">
																<div class="question-item clearfix">
																	<div class="question-item-left">
																		<div class="left-img">
																			<div class="white-rectangle"></div>
																			<div class="triangle"></div>
																			<div class="shelter-edge"></div>
																			<div style="position: absolute;bottom: 25%;color: white;left: 50%;transform: translateX(-50%);font-weight: bold;">
																				{{ getFileType(item) }}
																		</div>
																		</div>
																	</div>
																	<div class="question-item-right">
																		<a class="questionTitle">{{ item.title }}</a>
																		<p class="questionInf">{{ item.description || '' }}</p>
																		<el-button class="questionButton" size="mini" v-for="(tagItem, j) in item.tagList" :key="j">
																			{{ tagItem.name }}
																		</el-button>
																		<p class="questionTime">上传时间：<span>{{ item.createTime ? $convertTime(item.createTime) : '' }}</span>所需积分：<span>5</span></p>
																	</div>
																</div>
																<div class="moreDownBtn">
																	<p class="moreDownBtnUp">{{ auditState === 0 ? '待审核' : auditState === 1 ? '审核通过' : '审核未通过' }}</p>
																	<el-link :underline="false">编辑</el-link>
																</div>
																<hr style="border: 1px dotted #ccc;">
														</div>
												</el-tab-pane>
												<el-tab-pane label="下载明细" name="second">
													<div v-for="(item, i) in showList" :key="i">
														<div class="question-item clearfix">
															<div class="question-item-left">
																<div class="left-img">
																	<div class="white-rectangle"></div>
																	<div class="triangle"></div>
																	<div class="shelter-edge"></div>
																	<div style="position: absolute;bottom: 25%;color: white;left: 50%;transform: translateX(-50%);font-weight: bold;">
																		{{ getFileType(item) }}
																</div>
																</div>
															</div>
															<div class="question-item-right">
																	<a class="questionTitle">{{ item.title }}</a>
																	<p class="questionInf">{{ item.description || '' }}</p>
																	<el-button class="questionButton" size="mini" v-for="(tagItem, j) in item.tagList" :key="j">
																		{{ tagItem.name }}
																	</el-button>
																	<p class="questionTime">上传时间：<span>{{ item.createTime ? $convertTime(item.createTime) : '' }}</span>所需积分：<span>5</span></p>
															</div>
															<el-link :underline="false" class="moreDownBtnUp">立即评价</el-link>
														</div>
														<hr style="border: 1px dotted #ccc;">
													</div>
												</el-tab-pane>
										</el-tabs>
									</el-tab-pane>
									<!-- <el-tab-pane label="已下载" name="second"></el-tab-pane>
									<el-tab-pane label="上传资源" name="third"></el-tab-pane> -->
								</el-tabs>
								<el-pagination
									background
									layout="prev, pager, next"
									:page-size="pageSize"
									:page-count="pageNum"
									:hide-on-single-page="true"
									@current-change="consoleCurr"
									style="position: relative;left: 0;bottom: 0;transform: translateX(0);width: 50%;margin: 0 auto 10px;text-align: center;">
								</el-pagination>
							</div>
            </div>
            <div class="right">
                <div class="myAnswer">
                    <div class="userPic">
                        <div class="selfPic"></div>
                        <div>
                            <p class="purple" style="font-size: 18px;">{{ nickname }}</p>
                            <p style="color: #666;font-size:18px;">积分：<span class="purple">{{ points }}</span></p>
                        </div>
                    </div>
                    <p>上传了<span class="purple">{{ uploadNum }}</span>个资源</p>
                    <p>下载了<span class="purple">{{ downloadNum }}</span>个资源</p>
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
			noId: false,
			uploadNum: Cookies.get('uploadNum'),
			downloadNum: Cookies.get('downloadNum'),
			points: Cookies.get('points'),
			nickname: Cookies.get('nickname'),
      brandCondition: [],
      show: 'none',
      input3: '',
      score: '3',
      selfScore: '41',
			mallCode: null,
      fileName: null,
			title: null,
			activeName1: 'first',
      activeName2: 'first',
			pageSize: null,
      pageNum: null,
      currentPage: 1,
			showList: [],
			downLoadFile: {},
			auditState: 0,
    };
  },

  beforeMount () {
		//console.log(this.$route.query.mallCode)
		if (!this.$route.query.mallCode) this.noId = true
		else this.fileName = this.$route.query.fileName
		this.mallCode = this.$route.query.mallCode
		// this.title = this.$route.query.title
		this.activeName1 = this.$route.query.index == 1 ? 'first' : 'second'
		axios({
			url: 'portal/information/information/' + this.$route.query.mallCode,
			method: 'get',
			params: {
					token: Cookies.get('token')
			}
		}).then(res => {
			console.log(res.data.brdInformation)
			this.downLoadFile = res.data.brdInformation
			this.title = res.data.brdInformation.title
			this.auditState = res.data.brdInformation.auditState
		})

		if (this.activeName1 == 'first') this.getRecommendList(1)
		else this.getUploadList(1)
  },

  methods: {
		getFileType (obj) {
			return obj.ossResource ? obj.ossResource.type ? obj.ossResource.type.replace('image/', '') : 'DOC' : 'DOC'
		},
		getRecommendList (currentPage) {
			// 获取推荐资源
			axios({
				method: 'get',
				url: 'portal/information/informations',
				params: {
					token: Cookies.get('token'),
					recommend: 1,
					page: currentPage,
				}
			}).then(res => {
				console.log(res.data)
				this.showList = res.data.page.list;
				this.pageSize = res.data.page.pageSize
				this.pageNum = res.data.page.totalPage
				document.body.scrollTop = document.documentElement.scrollTop = 0
				// for (let i = 0; i < this.pageNum; i++) {
				// 	this.totalPage[i] = list.slice(this.pageSize * i, this.pageSize * (i + 1))
				// }
			})
		},
		getDownList (currentPage) {
			// 下载资料
			axios({
				method: 'get',
				url: 'portal/user/information/informations',
				params: {
					token: Cookies.get('token'),
					userId: Cookies.get('userId'),
					type: 2,
					page: currentPage
				}
			}).then(res => {
				console.log(res.data)
				this.showList = res.data.page.list;
				this.pageSize = res.data.page.pageSize;
				this.pageNum = res.data.page.totalPage;
			})
		},
		getUploadList (currentPage) {
			// 上传资料
			axios({
			  method: 'get',
			  url: 'portal/user/information/informations',
			  params: {
			    token: Cookies.get('token'),
			    userId: Cookies.get('userId'),
					type: 1,
					page: currentPage
			  }
			}).then(res => {
			  console.log(res.data)
			  this.showList = res.data.page.list
			  this.pageSize = res.data.page.pageSize
			  this.pageNum = res.data.page.totalPage
			})
		},
		// 下载首页和我的资源tab页切换
		handleClick1 (tab) {
			console.log(tab)
			if (tab.name === 'second') {
				this.getUploadList(1)
				this.getDownList(1)
			}
			else if (tab.name === 'first') {
				this.getRecommendList(1)
			}
		},
		// 我的资源tab页下，子tab页切换
		handleClick2 (tab) {
			console.log(tab)
			if (tab.name === 'first') {
				this.getUploadList(1)
			}
			else if (tab.name === 'second') {
				this.getDownList(1)
			}
		},
		downLoad (downLoadFile) {
			console.log(downLoadFile.point)
			if (this.points >= downLoadFile.point) {
				this.$confirm('当前积分' + this.points + ', 需扣除积分' + downLoadFile.point + ', 是否确定下载?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// window.open(axios.defaults.baseURL + 'portal/file/downloadFile/' + this.mallCode + '/'
					// 						+ this.fileName + '?token=' + Cookies.get('token'), '_self')
					// this.points -= downLoadFile.point
					// Cookies.set('points', this.points, {expires: this.toNextDay()})
					// location.reload()
					axios({
						method: 'get',
						url: axios.defaults.baseURL + 'portal/file/downloadFile/' + this.mallCode + '/' + this.fileName + '?token=' + Cookies.get('token'),
						responseType: 'blob'
					}).then(res => {
						console.log(res)
						let url = window.URL.createObjectURL(new Blob([res.data]))
						let link = document.createElement('a')
						link.style.display = 'none'
						link.href = url
						link.setAttribute('download', this.fileName)
						
						document.body.appendChild(link)
						link.click()

						// 重新获取用户积分等信息
						axios({
								method: 'get',
								url: 'portal/user/optNum/' + Cookies.get('userId'),
								params: {
									token: Cookies.get('token')
								}
						}).then(res => {
							console.log(res.data)
							Cookies.set('points', res.data.user.points, {expires: this.toNextDay()})
							Cookies.set('uploadNum', res.data.user.uploadNum, {expires: this.toNextDay()})
							Cookies.set('downloadNum', res.data.user.downloadNum, {expires: this.toNextDay()})
							this.uploadNum = Cookies.get('uploadNum')
							this.downloadNum = Cookies.get('downloadNum')
							this.points = Cookies.get('points')
						})
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消下载'
							})
						})
					})
					
			}
			else {
				this.$alert('对不起，您的积分不足！', '提示', {
					confirmButtonText: '确定',
					type: 'warning'
        })
			}
		},
		toNextDay() {
			return new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0))
		},
    consoleCurr (currentPage) {
			//console.log(`${val}`)
			this.currentPage = currentPage;
			if (this.activeName1 == 'first') {
				this.getRecommendList(currentPage)
			}
			else {
				if (this.activeName2 == 'first') {
					this.getUploadList(currentPage)
				}
				else {
					this.getDownList(currentPage)
				}
			}
    }
	}
}
</script>

<style lang='less' scoped>
@import '~assets/less/main.less';

button {
	width: 100px;
	height: 30px;
}

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
		min-height: 20px;
    color: #6a6f6f;
    margin: 10px 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.questionTime span {
    margin: 0 30px 0 0;
}

.current-download {
	// padding: 0 10px;
	position: relative;
}

.moreDownload {
    // margin-top: 70px;
    overflow: hidden;
    position: relative;
}

.moreDownBtn {
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
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
      top: 45%;
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
		position: relative;
    float: right;
    width: 85%;
    min-height: 120px;
    padding: 1rem 1rem 0 0;
	}
}

.moreDownBtnUp {
	margin: 0 0 10px 20px;
	color: #6b2048;
}
</style>