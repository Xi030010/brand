<!-- 品牌回答 -->
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
            <!-- <el-menu-item index="1" @click="tabs('questionList')">问题首页</el-menu-item> -->
            <el-menu-item index="1" @click="jumpUrl('./brandConnect')">问题首页</el-menu-item>
            <el-menu-item index="2">悬赏问题</el-menu-item>
            <el-menu-item index="3">已解决</el-menu-item>
            <el-menu-item index="4">未解决</el-menu-item>
        </el-menu>
        <!-- <el-input class="questionSearch" v-model="input" placeholder="问题搜索"></!-->
        <div class="questionList" :style="{ visibility: tabsVisibility.questionList }">
            <div>
                <div class="question">
                    <h1>{{ list.title }}</h1>
                    <div class="questionContent" v-html="list.content"></div>
                    <br>
                    <p class="time">编辑于：<span>{{ list.createTime }}</span></p>
                    <br>
                    <p>浏览<span style="margin-right: 10px">{{ list.readNum }}</span>评论<span>{{ topicPoint }}</span></p>
                    <div  style="overflow: hidden;position: relative;">
                        <div class="questionNav">
                            <el-link :underline="false">分享</el-link>
                            <el-link :underline="false">收藏</el-link>
                        </div>
                        <div class="user-info">
                            <div class="head">
															<img :src="avatar" alt="头像" style="width: 50px;height: 50px;border-radius: 50%;">
														</div>
                            <div class="name">{{ username }}</div>
                        </div>
                    </div>
                </div>
                <hr style="border: 0;border-bottom: 2px solid #ccc;">
                <div>
                    <p style="font-size: 17px;"><span>{{ topicPoint }}</span>个回答</p>
                    <hr style="border: 0;border-bottom: 1px solid #ccc;">
                    <!--循环此部分-->
                    <div class="question" v-for="(item, i) in list.brdCommentList" :key="i">
                        <div class="questionContent" v-html="item.content"></div>
                        <br>
                        <div  style="overflow: hidden;position: relative;">
                            <div class="questionNav">
                                <p class="time">编辑于：<span>{{ item.createTime }}</span></p>
                                <el-link :underline="false" icon="el-icon-s-comment" @click="response(i)">回复<span>（{{ list.brdCommentList[i].brdReplyList.length }}）</span></el-link>
                            </div>
                            <div class="user-info">
                                <div class="head">
																	<img :src="avatar" alt="头像" style="width: 50px;height: 50px;border-radius: 50%;">
																</div>
                                <div class="name">{{ username }}</div>
                            </div>
                        </div>
                        <div :name="i" ref="card" style="display: none">
                            <el-card v-if="list.brdCommentList[i].brdReplyList.length" class="box-card">
                                <div v-for="(items, o) in list.brdCommentList[i].brdReplyList.slice(responseLeftIndex, responseRightIndex)" :key="o" class="text item" style="margin-top:10px">
                                    {{ items.content }}
                                </div>
                            </el-card>
                            <div class="block">
                                <el-pagination
                                    layout="prev, pager, next"
                                    :page-size="responsePageSize"
                                    :total="list.brdCommentList[i].brdReplyList.length"
                                    :hide-on-single-page="true"
                                    @current-change="responsePageChange"
                                    style="position: relative;left: 0;bottom: 0;transform: translateX(0);width: 50%;margin: 0 auto">
                                </el-pagination>
                            </div>
                            <div class="right-button" :style="{visibility: isPopWindow ? 'hidden' : 'visible'}">
                              <el-button
																@click="reply('comment', list.brdCommentList[i].brdReplyList, list.brdCommentList[i].id)"
																type="primary">
																回复评论
															</el-button>
                            </div>
                        </div>
                        <hr style="border: 0;border-bottom: 1px solid #ccc;">
                    </div>
                    
                </div>

                <div class="right-button" :style="{visibility: isPopWindow ? 'hidden' : 'visible'}">
                  <el-button @click="reply('topic')" type="primary">回复话题</el-button>
                </div>

                <div class="blackBg" :class="{hide: !showEditor}">
                  <div class="quill-editor">
                    <div class="right-close">
                      <i class="el-icon-close" @click="closeEditor"></i>
                    </div>
                    <div v-if="showEditor">
                      <div v-quill:myQuillEditor="editorOption"
                          @focus="onEditorFocus($event)"
                          @blur="onEditorBlur($event)"
                          @change="onEditorChange($event)"
                          style="height: 300px;">
                      </div>
                      <div class="right-button" v-if="isPopWindow">
                        <el-button @click="submitReply" type="primary">提交</el-button>
                      </div>
                    </div>
                    <!--<Eidtor></Eidtor>-->
                  </div>
                </div>
            </div>
        </div>
        <div class="questionRightBar">
            <el-button type="primary"  @click="turnUrl('/askQuestion')" style="width: 100%; border-radius: 0px; background: #6b2049; border: 1px solid #6b2049;">我要提问</el-button>
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
            <div class="newResponse">
                <p class="newResponseTitle">相似问题</p>
                <hr>
                <div class="responseList">

                </div>
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
//import Editor from '~/components/wangeidtor';

export default {
  middleware: 'auth',
  components: {
      login,
      navbar,
      footerBar,
      search,
      //Editor,
  },

  data () {
    return {
			userPoint: Cookies.get('points'),
			askNum: Cookies.get('askNum'),
			answerNum: Cookies.get('answerNum'),
			avatar: Cookies.get('avatar'),
			username: Cookies.get('username'),
			activeIndex: '1',
			input: '',
			tabsVisibility: {
					questionList: '',
			},
			editorOption: {
				// 富文本中的一些属性
				modules: {
					toolbar: [
							[{'size': ['small', false, 'large']}],
							[{ 'font': [] }],     //字体
							[{ 'color': [] }, { 'background': [] }],
							['bold', 'italic'],
							[{'list': 'ordered'}, {'list': 'bullet'}],
							['link', 'image'],
							['blockquote'],
							[{ 'align': [] }],    //对齐方式

					]
				}
			},
			topicId: 1,
			list: '',
			topicPoint: '',
			activeName: '',
			responsePageSize: 1,
			responseCurrentPage: 1,
			inCard: false,
			content: '',
			showEditor: false,
			replyType: null,
			brdReplyList: null,
			currentReplyId: null,
			isPopWindow: false,
    };
  },
  computed: {
      responseLeftIndex () {
          if (this.responseCurrentPage === 1) {
              return 0
          }
          else {
              return (this.responseCurrentPage - 1) * this.responsePageSize
          }
      },
      responseRightIndex () {
          return this.responseCurrentPage * this.responsePageSize
      }
  },

  mounted() {
    this.topicId = this.$route.query.topicId
    this.getBrdCommentList()
  },

  methods: {
    jumpUrl (url) {
			location.href = url
		},
    getBrdCommentList () {
      axios({
        url: 'dbblog/portal/topic/topic/' + this.topicId,
        method: 'get',
        params: {
          token: Cookies.get('token')
        }
      }).then(res => {
        console.log(res.data)
        // console.log(res.data.brdTopic.brdCommentList[0].brdReplyList);
        this.list = res.data.brdTopic;
				this.topicPoint = res.data.brdTopic.brdCommentList.length
				this.list.content += '<style>img {width: 300px;height:300px}</style>'
      })
    },
    tabs(xx) {
      for ( let vib in this.$data.tabsVisibility) {
        this.$data.tabsVisibility[vib] = 'hidden';
      }
      this.$data.tabsVisibility[xx] = '';
    },
    onEditorReady (editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur (editor) {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus (editor) {},
    // 富文本编辑器 内容改变事件
    onEditorChange ({editor, html, text}) {
      // console.log('editor change!', editor, html, text)
      this.content = text
    },
    turnUrl(url) {
      location.href = url;
    },
    response(i) {
      //console.log(this.$refs.card[i]);
      if(this.$refs.card[i].style.display == 'none'){
          this.$refs.card[i].style.display = 'block';
          this.inCard = true
      }else{
          this.$refs.card[i].style.display = 'none';
          this.inCard = false
      }
    },
    responsePageChange (currentPage) {
      this.responseCurrentPage = currentPage
    },
    reply (type, brdReplyList, id) {
      this.showEditor = true
      // 设置回复类型
      this.replyType = type
      // 若回复评论，设置当前reply列表
      this.brdReplyList = brdReplyList
			this.currentReplyId = id
			this.isPopWindow = true
      console.log('currentReplyId is ' + this.currentReplyId)
    },
    submitReply () {
      // 回复话题
      if (this.replyType === 'topic') {
        axios({
          method: 'post',
          url: 'dbblog/portal/comment/save',
          params: {
            token: Cookies.get('token'),
          },
          data: {
            topicId: this.topicId,
            topicType: 4,
            content: this.content,
            adopt: false,
            fromUid: 7,
          }
        }).then(res => {
          console.log(res.data)
          // 重新获取评论数据
					this.getBrdCommentList()
					// 切换编辑器显示
					this.showEditor = false
					// 切换按钮状态
					this.isPopWindow = false
        })
      }
      // 回复评论
      else {
        axios({
          method: 'post',
          url: 'dbblog/portal/reply/save',
          params: {
            token: Cookies.get('token')
          },
          data: {
            replyId: !this.brdReplyList.length ? this.currentReplyId : this.brdReplyList[0].replyId,
            commentId: !this.brdReplyList.length ? this.currentReplyId : this.brdReplyList[0].commentId,
            content: this.content,
            replyType: 'content',
            fromUid: 7,
            toUid: 7,
          }
        }).then(res => {
          console.log(res.data)
          // 重新获取评论数据
          this.getBrdCommentList()
					this.showEditor = false
					// 切换按钮状态
					this.isPopWindow = false
        })
      }
      
    },
    closeEditor () {
			this.showEditor = false
			this.isPopWindow = false
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
    background: #a0d56d;
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

.question h1 {
    text-align: center;
    font-size: 20px;
}

.time {
    color: #ccc;
    margin-bottom: 10px;
}

.head {
    width: 50px;
    height: 50px;
    border-radius: 50%;
		border: 1px solid black;
		margin: 0 auto;
}

.name {
    margin-bottom: 10px;
}

.questionNav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}

.blackBg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2);
    z-index: 1000;
}

.hide {
  display: none;
}

.block {
  margin-top: 1rem;
}

.right-button {
  text-align: right;
  margin-bottom: 0.5rem;
}

.quill-editor {
  position: fixed;
  width: 635px;
  height: 325px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}

.right-close {
  text-align: right;
  margin-right: 0.5rem;
  cursor: pointer;

  i {
    position: absolute;
    top: 5px;
    right: 5px;

    &:hover {
      border: 5px solid black;
    }
  }
}

.user-info {
	float: right;
	width: 20%;
	text-align: center;
}

</style>