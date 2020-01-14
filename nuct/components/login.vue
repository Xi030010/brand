<!-- 登录 -->
<template>
    <div>
        <div class="loginDiv">
        <!-- 登录前显示登录注册栏 -->
					<div class="login"  :class="{loginState: loginState1}">
						<a @click="login">{{ loginIn }}</a>
						<a @click="registerReg">{{ register }}</a>
					</div>
	<!-- 登录成功显示的个人栏 -->
					<div class="user" :class="{loginState: loginState}">
						<span @click="turnURL">
							<el-avatar
								:size="size"
								src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
								style="cursor: pointer">
							</el-avatar>
						</span>
						<el-link :underline="false" style="position: relative;top: -8px;left: 5px; color: #fff;" @click="loginOut">退出</el-link>
					</div>
        </div>
        <!-- 点击登录弹出的覆盖层登录界面 -->
        <div class="loginInbg" :class="{hide: hideDiv}">
            <el-form ref="form" status-icon :label-position="labelPosition" :model="form" label-width="80px" class="loginForm">
                <div class="loginFormTitle">
                    <span>登陆</span>
                    <i class="el-icon-close iconClose" @click="closeForm"></i>
                </div>
                <el-form-item label="用户名">
                    <el-input v-model="form.name" clearable style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.psw" show-password style="width: 250px;"></el-input>
                </el-form-item>
                <el-button
                    type="primary"
                    style="margin-left: 160px;background: #ef8b3b; border: 1px solid #ef8b3b;"
                    @click="loginFormIn">
                    登陆
                </el-button>
            </el-form>
        </div>

        <!-- 点击注册弹出的覆盖层注册界面 -->
				<div class="loginInbg" :class="{hide: hideRegDiv}">
					<el-form ref="regForm" status-icon :label-position="labelPosition" :model="regForm" label-width="80px" class="loginForm">
							<div class="loginFormTitle">
									<span>注册</span>
									<i class="el-icon-close iconClose" @click="closeRegForm"></i>
							</div>
							<el-form-item label="邮箱">
									<el-input v-model="regForm.email" clearable style="width: 250px;"></el-input>
							</el-form-item>
              <el-form-item label="昵称">
									<el-input v-model="regForm.nickname" clearable style="width: 250px;"></el-input>
							</el-form-item>
							<el-form-item label="密码">
									<el-input v-model="regForm.password" show-password style="width: 250px;"></el-input>
							</el-form-item>
              <el-form-item label="再输一次">
									<el-input v-model="regForm.passwordAgain" show-password style="width: 250px;"></el-input>
							</el-form-item>
              <el-form-item label="电话">
									<el-input v-model="regForm.phone" clearable style="width: 250px;"></el-input>
							</el-form-item>
              <el-form-item label="用户名">
									<el-input v-model="regForm.username" clearable style="width: 250px;"></el-input>
							</el-form-item>
							<el-button
									type="primary"
									style="margin-left: 160px;background: #ef8b3b; border: 1px solid #ef8b3b;"
									@click="regFormIn">
									注册
							</el-button>
					</el-form>
			</div>
    </div>
</template>

<script>
import Cookies from '~/plugins/cookie';
import axios from 'axios';
import qs from 'qs';
//import {http, qs} from '../plugins/axios';

export default {
  name: 'login',
  data () {
    return {
      token: '',
			hideDiv: true,
			hideRegDiv: true,
      loginState: true,
      loginState1: true,
      labelPosition: 'right',
      form: {
        name: '',
        psw: '',
      },
      size: 'small',
      regForm: {
        email: '',
        nickname: '',
        password: '',
        passwordAgain: '',
        phone: '',
        username: '',
      },
    }
  },
  props: {
    loginIn: {
      type: String,
      default: '登陆'
    },
    register: {
      type: String,
      default: '注册'
    }
	},
	mounted () {
		if(Cookies.get('token')) {
			this.loginState = false;
		}
		else {
      this.loginState1 = false;
		}
	},
  methods: {
    regFormIn () {
      // 校验
      var checkSuccess = true
      var obj = {
        email: '邮箱',
        nickname: '昵称',
        pasword: '密码',
        passwordAgain: '确认密码',
        phone: '电话',
        username: '用户名'
      }
      for (var key in this.regForm) {
        if (!this.regForm[key]) {
          this.$message({
            message: obj[key] + '不能为空',
            type: 'warning'
          })
          checkSuccess = false
          return
        }
      }

      // 邮箱格式校验
      if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.regForm.email))) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'warning',
        })
        return
      }

      // 确认密码校验
      if (this.regForm.password !== this.regForm.passwordAgain) {
        this.$message({
          message: '两次密码不相同，请重新确认!',
          type: 'warning',
        })
        return
      }

      // 校验用户名
      axios({
        method: 'get',
        url: 'portal/user/exist/' + this.regForm.username,
        params: {
          token: Cookies.get('token')
        }
      }).then(res => {
        if (res.data.code != 200) {
          this.$message({
            message: '用户名已存在',
            type: 'warning',
          })
        }
        else {
          // 注册api
          checkSuccess && axios({
            method: 'post',
            url: 'portal/user/register',
            data: {
              email: this.regForm.email,
              nickname: this.regForm.nickname,
              password: this.regForm.password,
              phone: this.regForm.phone,
              username: this.regForm.username,
            },
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            }
            else {
              this.$message({
                message: res.data.msg,
                type: 'warning',
              })
            }
          })
        }
      })

    },
		registerReg () {
			if(this.hideRegDiv) {
				this.hideRegDiv = false;
			}
		},
		closeRegForm () {
			if(this.hideRegDiv == false) {
				this.hideRegDiv = true;
			}
		},
      login () {
				document.addEventListener('keyup', (e) => {
					if (e.keyCode === 13) {
						this.loginFormIn()
					}
				})
        if(this.hideDiv) {
          this.hideDiv = false;
        }
      },
      turnURL () {
        location.href = "../myCount";
      },
      closeForm () {
        if(this.hideDiv == false) {
          this.hideDiv = true;
        } 
      },

      loginFormIn () {
        console.log(this.form.name);
        console.log(this.form.psw);
        console.log(typeof this.form.name);
        console.log(typeof this.form.psw);
        axios.post('/portal/user/login',{
                "username": this.form.name,
                "password": this.form.psw,
        }).then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
						Cookies.set('loginMessageNum', 0, {expires: this.toNextDay()})
						Cookies.set('userId', res.data.userId, {expires: this.toNextDay()})
						Cookies.set('token', res.data.token, {expires: this.toNextDay()});

						axios({
							method: 'get',
							url: 'portal/user/optNum/' + Cookies.get('userId'),
							params: {
								token: Cookies.get('token')
							}
						}).then(res => {
							console.log(res.data)
							Cookies.set('nickname', res.data.user.nickname, {expires: this.toNextDay()})
							Cookies.set('username', res.data.user.username, {expires: this.toNextDay()})
							Cookies.set('points', res.data.user.points, {expires: this.toNextDay()})
							Cookies.set('uploadNum', res.data.user.uploadNum, {expires: this.toNextDay()})
							Cookies.set('downloadNum', res.data.user.downloadNum, {expires: this.toNextDay()})
							Cookies.set('askNum', res.data.user.askNum, {expires: this.toNextDay()})
							Cookies.set('answerNum', res.data.user.answerNum, {expires: this.toNextDay()})
							Cookies.set('avatar', res.data.user.avatar, {expires: this.toNextDay()})
							Cookies.set('phone', res.data.user.phone, {expires: this.toNextDay()})
              Cookies.set('email', res.data.user.email, {expires: this.toNextDay()})
						})

						setTimeout(() => {
							window.location.href = '';
						}, 100)
					}
					else {
						this.$message({
							message: '账号或密码错误',
							type: 'warning'
						})
					}
				}).catch(error => {
						console.log(error);
				})
      },

      toNextDay() {
        return new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0))
      },
      loginOut () {
        axios({
          method: 'post',
          url: 'portal/user/logout',
          params: {
            token: Cookies.get('token'),
          }
        }).then(res => {
          var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
          if (keys) {
            for (var i = keys.length; i--;)
              document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
          }

          setTimeout(() => {
            window.location.href = '';
          }, 100);
        })
    },
  },
}

</script>
<style lang='less'>
@mainColor: #6b2049;
.loginDiv {
    height: 60px;
    width: 1080px;
    overflow: hidden;
    //background: #6b2048;
    position: absolute;
    z-index: 999;
    //top: 35px;
}

a {
    color: #fff;
}


.login {
    //background: #6b2048;
    position: absolute;
    line-height: 25px;
    right: 0;
    bottom: 0;
    //z-index: 99;
}

.login a {
    text-align: center;
    width: 65px;
    float: left;
    line-height: 25px;
    padding: 0 5px;
}

.login a:hover {
    background: #ef8b3b;
    cursor: pointer;
    border-radius: 55px;
}

.login a:nth-child(2) {
    margin-right: 65px;
}

.loginInbg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    z-index: 1000;
}

.hide {
    display: none;
}

.loginForm {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 400px;
    // height: 270px;
    border: 1px solid #000;
    padding-bottom: 20px;
    background: #fff;
}

.loginFormTitle {
    width: 100%;
    line-height: 30px;
    background: @mainColor;
    text-align: center;
    color: #fff;
    margin-bottom: 30px;
}

.iconClose {
    position: relative;
    right: -160px;
    cursor: pointer;
}

.user {
    float: right;
    margin-right: 65px;
    //margin-top: 30px;
    z-index: 99;
}

.loginState {
    display: none;
}

.el-form-item__label {
    color: @mainColor;
}
</style>