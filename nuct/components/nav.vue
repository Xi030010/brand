<!-- 导航栏 -->
<template>
      <ul class="nav">
          <li><a href="/">网站首页</a></li>
          <li><a>研究院介绍</a></li>
          <li><a>机构设置</a></li>
          <li><a>科学研究</a></li>
          <li><a>教学课程</a></li>
          <li><a>项目合作</a></li>
          <li><a>成果推广</a></li>
          <li><a>联系我们</a></li>
      </ul>
</template>

<script>
export default {
    name: 'navbar',
  data () {
    return {
    };
  }
}

</script>
<style lang='less' scoped>
@import '~assets/less/main.less';
    a,
    p,
    span {
        color: #fff;
    }

    .nav {
        position: absolute;
        top: 83px;
        right: 130px;
        height: 40px;
        z-index: 9999;
        width: 800px;
        height: 40px;
    }

    .nav li {
        text-align: center;
        float: left;
        width: 80px;
        height: 35px;
        line-height: 35px;
        margin: 0 10px;
    }

    .nav li:hover {
        background: #ef8b3b;
        border-radius: 55px;
    }
</style>