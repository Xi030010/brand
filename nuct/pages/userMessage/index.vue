<!-- 个人资料 -->
<template>
  <div class="container">
      <login></login>
      <navbar></navbar>
      <div class="showAbout">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <footerBar></footerBar>
  </div>
</template>

<script>
import login from '~/components/login';
import navbar from '~/components/nav';
import footerBar from '~/components/footer';
export default {
    middleware: 'auth',
  data () {
    return {
    };
  },
  components: {
      login,
      navbar,
      footerBar,
  }
}

</script>
<style lang='less' scoped>
@import '~assets/less/main.less';
.showAbout {
    min-height: 500px;
    margin-top: 100px;
    background: #f5f5f5;
    padding-top: 20px;
}

.Breadcrumb {
    margin-left: 10px;
    margin-bottom: 50px;
}
</style>