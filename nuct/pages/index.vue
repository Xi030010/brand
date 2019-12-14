<!--  -->
<template>
    <div class="container">
        <login></login>
        <swiper></swiper>
        <navbar></navbar>
        <logo></logo>
        <div>
            <p class="brandName">支持平台</p>
            <p class="brandSmallName">Support Platform</p>
            <p class="arrow">︾</p>
        </div>
        <div class="brandBanner">
            <div>
                <img src="../static/img/741571927530_.pic.jpg" alt="" style="width: 100%; height: 100%;">
                <p style="text-align: center; margin-top: 30px; font-weight: 700;">品牌测算软件</p>
            </div>
            <div @click="jumpUrl('/brandSearch')">
                <img src="../static/img/751571927530_.pic.jpg" alt="" style="width: 100%; height: 100%;">
                <p style="text-align: center; margin-top: 30px; font-weight: 700;">品牌数据查询</p>
            </div>
            <div @click="jumpUrl('/brandDoc')">
                <img src="../static/img/761571927530_.pic.jpg" alt="" style="width: 100%; height: 100%;">
                <p style="text-align: center; margin-top: 30px; font-weight: 700;">品牌图书馆</p>
            </div>
            <div @click="jumpUrl('/brandConnect')">
                <img src="../static/img/771571927530_.pic.jpg" alt="" style="width: 100%; height: 100%;">
                <p style="text-align: center; margin-top: 30px; font-weight: 700;">品牌学术论坛</p>
            </div>
        </div>
        <!-- <div class="wx">
            <div>关注微信公众号</div>
            <div>关注微信小程序</div>
        </div> -->
        <div class="friend">
            <div>
                <p class="brandName">联合发展与合作机构</p>
                <p class="brandSmallName">Joint Development and Cooperation Agency</p>
                <p class="arrow">︾</p>
            </div>
            <!-- <hr> -->
            <div class="cooperation">
                <!-- <div>北方工业大学</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div> -->
                <p>
                    中国品牌发展公益基金&nbsp;&nbsp;&nbsp;&nbsp;中国品牌建设促进会&nbsp;&nbsp;&nbsp;&nbsp;中国质量协会&nbsp;&nbsp;&nbsp;&nbsp;中国商业史学会
                </p>
                <br>
                <p>
                    首都经济贸易大学中国品牌研究中心&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对外经济贸易大学奢侈品研究中心
                </p>
                <br>
                <p>
                    深圳市精算品牌评价科学研究院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京国信品牌评价科学研究院
                </p>
                <br>
                <p>
                    安徽省质量品牌促进会&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;深圳市连锁经营协会&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;深圳市商业行业协会
                </p>
                <br>
                <p>
                    海南省质量协会&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;《品牌研究》杂志社&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;《品质》杂志社
                </p>
            </div>
            <footerBar></footerBar>
        </div>
    </div>

</template>

<script>
import login from '~/components/login';
import swiper from '~/components/carousel';
import navbar from '~/components/nav';
import footerBar from '~/components/footer';
import logo from '~/components/logo';
import axios from 'axios';
import Cookies from '~/plugins/cookie';

export default {
    components: {
        login,
        swiper,
        navbar,
        footerBar,
        logo,
    },
    methods: {
        jumpUrl (url) {
            if(Cookies.get('token') == null) {
                this.$message('请先登录'); 
            }else{
                location.href = url;
            }
            
        }
    }
}

</script>
<style lang='less' scoped>
@import '~assets/less/main.less';
@EnglishTitle: 14px;
@ChineseTitle: 18px;
.container {
    background: url("../static/img/781571927539_.pic.jpg") no-repeat bottom;
}

.brandName {
    font-weight: 600;
    font-size: @ChineseTitle;
    margin-top: 20px;
    text-align: center;
}

.brandSmallName {
    font-size: @EnglishTitle;
    text-align: center;
}

.arrow {
    text-align: center;
}

.brandBanner,
.wx {
    position: relative;
    top: 50px;
    display: flex;
    justify-content: space-around;
}

.wx {
    top: 150px;
}

.brandBanner div {
    height: 120px;
    width: 200px;
    //border: 1px solid black;
}

.wx div {
    height: 200px;
    width: 400px;
    border: 1px solid black;
}

.friend {
    position: relative;
    top: 150px;
}

.friend h1 {
    font-size: 23px;
    font-weight: 300;
}

.friend h1 small {
    color: #ccc;
}

.cooperation {
    margin-top: 30px;
    // display: flex;
    // justify-content: space-around;
    margin-bottom: 30px;
}

.cooperation p {
    font-weight: 700;
    font-size: 15px;
    text-align: center;
}
// .cooperation div {
//     height: 70px;
//     width: 150px;
//     border: 1px solid black;
// }
</style>