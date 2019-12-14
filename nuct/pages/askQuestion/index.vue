<!-- 上传资料 -->
<template>
  <div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
      <div class="upload">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/brandConnect' }">话题</el-breadcrumb-item>
            <el-breadcrumb-item>上传资源</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="uploadForm">
            <el-form ref="form" :model="form" label-width="40px" style="width: 500px;margin: 0 auto;" :label-position="labelPosition">
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" style="width: 100%;resize: none;" v-model="form.describe" name="fileDescribe"></el-input>
                </el-form-item>
                <div class="quill-editor"
                    v-quill:myQuillEditor="editorOption"
                    v-model="form.content"
                    style="height: 300px; margin-bottom: 10px;">
                </div>
                <el-form-item>
                    <el-tag
                        type="success"  
                        :key="index"
                        v-for="(tag,index) in form.label"
                        style="margin-right: 10px"
                        >{{ tag.name }}</el-tag>  
                    <el-button type="text" @click="dialogVisible = true">点击新增标签（最多5个）</el-button>
                </el-form-item>
                <div>
                    <p>我的积分：<span style="color: #ef8b3b">{{ userPoint }}</span></p>
                    悬赏积分：
                    <el-input-number v-model="num" size="mini" controls-position="right" :min="0" :max="max"></el-input-number>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="formSubmit">立即提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
            title="新增标签"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="DigHandleClose">
            <span>新增的标签是：</span>
            <span>
                <el-tag
                    v-for="(tag,index) in form.label"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag.name)">
                    {{tag.name}}
                </el-tag>
            </span>
            <span>
                <el-input
                v-model="labelValue"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                ></el-input>
            </span>
            <span>
                <el-tag
                v-for="(item,index) in hotTag"
                :key="index"
                effect="dark"
                style="margin: 5px 5px 0px 0px"
                @click="addTag(item.name)"
                >{{ item.name }}</el-tag>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
  data () {
    return {
        max: parseInt(Cookies.get('points')),
        num: 0,
        labelPosition: 'left',
        dialogVisible: false,
        form: {
            name: '',
            describe: '',
            content: ``,
            label: [],
        },
        hotTag: [],
        userPoint: Cookies.get('points'),
        labelValue: '',
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
        }
    };
  },

  mounted() {
    axios({
          url: 'http://47.104.148.196:8081/dbblog/portal/operation/tags/4',
          method: 'get',
          params: {
            token: Cookies.get('token'),
          }
      }).then(res => {
          this.hotTag = res.data.tagList;
          //console.log(this.hotTag);
      })
  },

  components: {
      login,
      navbar,
      footerBar,
      search,
  },

  methods: {
    handleClose(tag) {
        this.form.label.splice(this.form.label.indexOf(tag), 1);
      },
    DigHandleClose(done) {
        this.$confirm('确认关闭？')
        .then(_ => {
            done();
        })
        .catch(_ => {});
    },
        handleInputConfirm() {
        let obj = {};
        let s = new Set();
        let inputValue = this.labelValue;
        if (inputValue) {
          if (this.form.label.length >= 5) {
              this.$message('最多5个标签'); 
              this.form.label.length = 5;
              this.labelValue = '';
              return;
          }

        for(var i = 0; i < this.form.label.length; i++){
            if(this.form.label[i].name == inputValue){
                this.labelValue = '';
                return
            }
        }
        
        obj["name"] = inputValue;
        obj["type"] = 3;
        this.form.label.push(obj);
        console.log(this.form.label);
        //   this.form.label.push(inputValue);
        }



        this.labelValue = '';
      },
    
    addTag(xx) {
        let obj = {};
        let s = new Set();
        if (xx) {
          if (this.form.label.length >= 5) {
              this.$message('最多5个标签'); 
              this.form.label.length = 5;
              return;
          }

        for(var i = 0; i < this.form.label.length; i++){
            if(this.form.label[i].name == xx){
                return
            }
        }

        obj["name"] = xx;
        obj["type"] = 4;
        this.form.label.push(obj);
        console.log(this.form.label);
        //   this.form.label.push(inputValue);
        }

    },

    formSubmit() {
          axios({
              url: 'dbblog/portal/topic/save',
              method: 'post',
              params:{
                  token: Cookies.get('token'),
              },
              data: {
                  'title': this.form.name,
                  'description': this.form.describe,
                  'content': this.form.content,
                  'reward': false,
                  'point': this.num,
                   'status': true,
                  'tagList': this.form.label,
                  'brdCommentList': null
              }
          }).then(res => {
              console.log(res.data);
          })
    }
  }
}

</script>
<style lang='less'>
@import '~assets/less/main.less';
.upload {
    min-height: 500px;
    //margin-top: 100px;
    //background: #f5f5f5;
    padding-top: 20px;
    overflow: hidden;
    box-shadow: 0px 2px 10px 4px #ccc;
}

.Breadcrumb {
    margin-left: 10px;
    //margin-bottom: 50px;
}

.uploadForm {
    background: #fff;
    width: 1000px;
    min-height: 200px;
    margin: 20px auto;
}

.el-form-item {
    margin-top: 20px;
}


.el-textarea .el-textarea__inner{ // 然后找到对应的类名，在这里将拉伸去掉即可
    height: 150px;
    resize: none;
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}
</style>