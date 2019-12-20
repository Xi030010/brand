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
            <el-breadcrumb-item :to="{ path: '/brandDoc' }">品牌资料</el-breadcrumb-item>
            <el-breadcrumb-item>上传资源</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="uploadForm">
            <el-form ref="form" :model="form" label-width="80px" style="width: 500px;margin: 0 auto;">
                <el-upload
                    class="upload-demo"
                    
                    ref="upload"
                    action=""
                    :data="uploadData"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-error="handleError"
                    :on-success="handleSuccess"
                    :before-remove="beforeRemove"
                    :before-upload="beforeUpload"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    
                    :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-form-item label="资源名称">
                    <el-input v-model="form.name" name="fileName"></el-input>
                </el-form-item>
                <el-form-item label="资源分类">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资源积分">
                    <!-- <el-input-number v-model="form.point" :min="0"></el-input-number> -->
										<el-select v-model="form.point" placeholder="请选择">
											<el-option
												v-for="item in pointOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
                </el-form-item>
                <el-form-item label="资源标签">
                    <!-- <el-tag
                        :key="tag"
                        v-for="tag in form.label"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag> -->
                    <el-tag
                    type="success"
                    :key="index"
                    v-for="(tag,index) in form.label"
                    style="margin-right: 10px"
                    >{{ tag.name }}</el-tag>  
                    <el-button type="text" @click="dialogVisible = true">点击新增标签（最多5个）</el-button>
                </el-form-item>
                <el-form-item label="资源描述">
                    <el-input type="textarea" style="width: 100%;resize: none;" v-model="form.describe" name="fileDescribe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked">同意&nbsp;&nbsp;&nbsp;品牌研究资源共享规则</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="isAbled" @click="formSubmit">立即提交</el-button>
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

// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
export default {
	middleware: 'auth',
  data () {
    return {
			pointOptions: [
				{
					value: '0',
					label: '不需积分'
				}
			],
			checked: false,
			isAbled: true,
			dialogVisible: false,
			form: {
				name: '',
				type: '',
				point: '',
				describe: '',
				label: [],
			},
			options: [],
			labelValue: '',
			hotTag: [],
			sourceID: '',
			uploadData: {
				'token': Cookies.get('token')
			},
			//fileList: [],
    };
  },
  components: {
      login,
      navbar,
      footerBar,
      search,
  },

  mounted() {
		for (var i = 1; i <= 50; i++) {
			this.pointOptions.push({
				value: i,
				option: i
			})
		}
		
		axios({
				url: 'portal/operation/categories',
				method: 'get',
				params: {
					token: Cookies.get('token'),
					type: 3
				}
		}).then(res => {
			// console.log(res.data.categoryList);
			this.options = res.data.categoryList;
			//console.log(this.options);
		});

		axios({
			url: 'portal/operation/tags/3',
			method: 'get',
			params: {
				token: Cookies.get('token'),
			}
		}).then(res => {
			this.hotTag = res.data.tagList;
			//console.log(this.hotTag);
		})
  },

  methods: {
      handleRemove(file) {
        console.log(file);
      },
      handleClose(tag) {
        this.form.label.splice(this.form.label.indexOf(tag), 1);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`);
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleError(err, file) {
          console.log(err);
      },
      formSubmit() {
				this.$refs.upload.submit()
        //   console.log(this.form.type);
        
        
    //     axios.post('portal/information/save',{
    //         token: Cookies.get('token'),
    //         'title': this.form.name,
    //         'description': this.form.describe,
    //         'categoryId': this.form.type,
    //         'resourceId': this.sourceID,
    //         'recommend': true,
    //         'createUserId': 7,
    //         'tagList': this.form.label,
    //         // 'token': Cookies.get('token'),
    //     }).then(res => {
    //         console.log(res.data);
    //    })
      },
      fileSubmit(params) {
        console.log(params)
      },
      beforeUpload(file) {
        //this.fileList.push(file)
        //console.log(this.fileList);
        var params = new FormData();
        params.append('file', file);
        params.append('token',Cookies.get('token'));
        //console.log(params.get('file'))
        axios.post('portal/file/uploadFile',params).then(res => {
            console.log(res.data);
            this.sourceID = res.data.id;
            axios({
              url: 'portal/information/save',
              method: 'post',
              params:{
                token: Cookies.get('token'),
              },
              data: {
                'title': this.form.name,
                'description': this.form.describe,
                'categoryId': 3,
                'resourceId': this.sourceID,
                'recommend': true,
                'createUserId': 7,
								'tagList': this.form.label,
								'point': this.form.point
              }
            }).then(res => {
							console.log(res.data);
							this.$message({
								message: '上传成功',
								type: 'success'
							})
							setTimeout(() => {
								this.$router.push('./brandDoc')
							}, 300)
            })
        })
        return true
      },
      handleSuccess(response, file) {
          //console.log(this.fileList);
          //console.log(response);
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

        // this.form.label.forEach(element => s.add(element));
        // s = [...s];
        // this.form.label.splice(0, this.form.label.length);
        // for(let j = 0; j < s.length; j++){
        //     this.form.label.push(s[j]);
        // }

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

        DigHandleClose(done) {
            this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
  },

  updated: function () {
      if (this.checked == false) {
          this.isAbled = true;
      }else{
          this.isAbled = false;
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
    padding: 20px 0;
    box-shadow: 4px 4px 10px 4px #ccc;
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