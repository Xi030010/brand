<!-- 关于我们 -->
<template>
    <div class="container">
        <login></login>
        <swiper></swiper>
        <navbar></navbar>
        <logo></logo>
        <div style="padding-top: 10px;">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        </el-breadcrumb>
            <p class="brandName">关于我们</p>
            <p class="brandSmallName">About Us</p>
            <p class="arrow">︾</p>
        </div>
        <div class="friend">
            <img src="../../static/img/about.png" alt="" style="margin: 0 auto;">
            <p style="text-align: center;">给第三方第三方士大夫随风都随风胜多负少的发斯蒂芬斯蒂芬斯蒂芬的防守打法水电费是打发顺丰胜多负少的方式防守打法</p>
        </div>        
        <footerBar style="width: 1080px;position: absolute; bottom: 0;"></footerBar>
    </div>

</template>

<script>
import login from '~/components/login';
import swiper from '~/components/carousel';
import navbar from '~/components/nav';
import footerBar from '~/components/footer';
import logo from '~/components/logo';
export default {
      middleware: 'auth',
    components: {
        login,
        swiper,
        navbar,
        footerBar,
        logo,
    },
    methods: {
        jumpUrl (url) {
            location.href = url;
        }
    }
}

</script>
<style lang='less' scoped>
@import '~assets/less/main.less';
@EnglishTitle: 14px;
@ChineseTitle: 18px;
.container {
    background: url("../../static/img/781571927539_.pic.jpg") no-repeat bottom;
    height: 1200px;
    position: relative;
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

</style>