<!-- 页脚 -->
<template>
  <div class="footer">
        <div class="footerNav">
            <a href="/about">关于我们</a>
            <a href="">研究院简介</a>
            <a href="">服务介绍</a>
            <a href="">联系我们</a>
        </div>
    <p>北方工业大学品牌研究院</p>
    <p>地址：北京&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;热线 : 400-010-1111&nbsp;&nbsp;网址: www.xxxx.com&nbsp;&nbsp;微信：xxxxxx&nbsp;&nbsp;冀ICP备11009212号—1</p>
  </div>
</template>

<script>
export default {
    name: 'footerBar',
  data () {
    return {
    };
  }
}

</script>
<style lang='less' scoped>
@import '~assets/less/main.less';

.footer {
    background: #6b2048;
    height: 145px;
    //margin-top: 50px;
    text-align: center;
}

.footerNav {
    padding-top: 30px;
}

.footer p {
    color: #fff;
}

.footerNav a {
    font-size: 16px;
    display: inline-block;
    width: 120px;
    border-right: 1px solid #fff;
    margin-bottom: 20px;
    color: #fff;
}

.footerNav a:nth-child(4) {
    border-right: none;
}

.footer p {
    margin-bottom: 20px;
}
</style>