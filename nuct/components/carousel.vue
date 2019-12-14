<!-- 轮播 -->
<template>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="../static/img/731571927527_.pic.jpg" alt="slide1" style=""></div>
        <div class="swiper-slide"><img src="../static/img/731571927527_.pic.jpg" alt="slide2" style=""></div>
        <div class="swiper-slide"><img src="../static/img/731571927527_.pic.jpg" alt="slide3" style=""></div>
    </div>

    <!-- 分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 滚动条 -->
    <!--<div class="swiper-scrollbar"></div>-->
</div>
</template>

<script>
import Swiper from 'swiper';
import "../node_modules/swiper/dist/css/swiper.css";
export default {
    name: 'swiper',
    mounted () {
        new Swiper ('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            /*scrollbar: '.swiper-scrollbar',*/
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            }
        })
    }
}

</script>
<style lang='less'>
.swiper-container {
    //background: skyblue;
    height: 347px;
    // border: 1px solid  #2dc6ff;
    // border-top: 0px;
}

.swiper-pagination-bullet-active {
    background: #ef8b3b;
    width: 30px;
    border-radius: 30px;
}
</style>