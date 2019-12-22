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
					<el-form ref="form" status-icon :label-position="labelPosition" :model="form" label-width="80px" class="loginForm">
							<div class="loginFormTitle">
									<span>注册</span>
									<i class="el-icon-close iconClose" @click="closeRegForm"></i>
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
          /*console.log(Cookies.get('token'));
          if (this.form.name == '123' && this.form.psw == '123') {
          Cookies.set('name', this.form.name, {expires: this.toNextDay()});
          Cookies.set('token', '4a10b399f668c23962f54118d0b0a8a1', {expires: this.toNextDay()});
          this.$router.push('');

          setTimeout(() => {
              window.location.href = '';
          }, 100) 
        } else {
          this.$message.error('账号密码不正确');
        }
        console.log(Cookies.get('token'));*/
        console.log(this.form.name);
        console.log(this.form.psw);
        console.log(typeof this.form.name);
        console.log(typeof this.form.psw);
        axios.post('/portal/user/login',{
                "username": this.form.name,
                "password": this.form.psw,
        }).then(res => {
					console.log(res.data);
          Cookies.set('loginMessageNum', 0, {expires: this.toNextDay()})
          Cookies.set('userId', res.data.userId, {expires: this.toNextDay()})
          Cookies.set('token', res.data.token, {expires: this.toNextDay()});
          
          // Cookies.set('userId', 7, {expires: this.toNextDay()})
          // localStorage.setItem("token", JSON.stringify(res.data.token))
          // console.log(JSON.parse(localStorage.getItem("token")));
          // this.$store.dispatch("setToken", res.data.token)
					//console.log(Cookies.get('token'));
          // axios({
          //     url: 'portal/user/info/7',
          //     method: 'get',
          //     params: {
          //         'token': Cookies.get('token')
          //     }
          // }).then(res => {
          //   console.log(res.data)
          //   Cookies.set('username', res.data.user.nickname)
          //   Cookies.set('points', res.data.user.points)
          // }).catch(error => {

          // });

          axios({
            method: 'get',
            url: 'portal/user/optNum/' + Cookies.get('userId'),
            params: {
              token: Cookies.get('token')
            }
          }).then(res => {
            console.log(res.data)
            Cookies.set('nickname', res.data.user.nickname, {expires: this.toNextDay()});
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
    width: 400px;
    height: 270px;
    border: 1px solid #000;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
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