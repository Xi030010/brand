<!--  -->
<template>
<div class="container">
    <div class="searchBanner">
        <navbar style="top: 0;"></navbar>
        <login></login>
    </div>
    <img src="../../static/img/791571927556_.pic.jpg" alt="">
    <search></search>
    <div class="showBrand">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/brandSearch'}">品牌列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$route.query.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="brandInformation">
            <h6><span class="hStyle"></span>品牌基础数据和基础指标汇总</h6>
                <el-table :data="baseSummaryList" style="width: 100%">
                    <el-table-column prop="region" label="地区" width="100"></el-table-column>
                    <el-table-column prop="type" label="类别" width="100"></el-table-column>
                    <el-table-column prop="population" label="人口（万人）" width="120"></el-table-column>
                    <el-table-column prop="profile" label="知名度（%）" width="100"></el-table-column>
                    <el-table-column prop="recognition" label="认知度（%）" width="120"></el-table-column>
                    <el-table-column prop="reputation" label="美誉度（%）" width="120"></el-table-column>
                    <el-table-column prop="loyalty" label="忠诚度（%）" width="120"></el-table-column>
                    <el-table-column prop="valuation" label="品牌信息量估值（万比特）" width="120"></el-table-column>
                </el-table>
            <h6><span class="hStyle"></span>品牌质量比值分析</h6>
                <el-table :data="brdQualityRatio" style="width: 100%">
                    <!-- <el-table-column prop="name" label="品牌" width="180"></el-table-column> -->
                    <el-table-column prop="totalQuantity" label="品牌信息总量（比特）" width="180"></el-table-column>
                    <el-table-column prop="baseQuantity" label="信息基本量（比特）" width="180"></el-table-column>
                    <el-table-column prop="baseContribution" label="品牌信息基本量的贡献率（%）" width="180"></el-table-column>
                    <el-table-column prop="qualityContribution" label="品牌信息质的贡献率（%）" width="180"></el-table-column>
                    <el-table-column prop="qualitySpecificValue" label="品牌信息质量比值" width="180"></el-table-column>
                </el-table>
            <h6><span class="hStyle"></span>品牌均值分析</h6>
                <el-table :data="brdMean" style="width: 100%">
                    <!-- <el-table-column prop="name" label="品牌" width="180"></!--> -->
                    <el-table-column prop="populationAverage" label="全国人口平均信息量（比特/人）" width="180"></el-table-column>
                    <el-table-column prop="targetPopulation" label="目标人群（人）" width="180"></el-table-column>
                    <el-table-column prop="targetConsumer" label="目标消费者平均信息量（比特/人）" width="180"></el-table-column>
                    <el-table-column prop="specificValue" label="信息均值比" width="180"></el-table-column>
                </el-table>
            <h6><span class="hStyle"></span>品牌稳定性分析</h6>
                <el-table :data="brdStability" style="width: 100%">
                    <!-- <el-table-column prop="name" label="品牌" width="180"></el-table-column> -->
                    <el-table-column prop="functionValue" label="N(E)函数值" width="180"></el-table-column>
                    <el-table-column prop="decayCoefficient" label="品牌衰减系数" width="180"></el-table-column>
                    <el-table-column prop="decayRate" label="品牌信息的衰减速率" width="180"></el-table-column>
                    <el-table-column prop="stabilityIndex" label="品牌稳定性指数" width="180"></el-table-column>
                </el-table>
        </div>
    </div>
    <footerBar></footerBar>
</div>
</template>

<script>
import login from '~/components/login';
import footerBar from '~/components/footer';
import navbar from '~/components/nav';
import search from '~/components/searchInput';
import axios from 'axios';
import Cookies from '~/plugins/cookie';

export default {
      middleware: 'auth',
  data () {
    return {
      baseSummaryList: [],
        brdQualityRatio: [
            {
                "id": 1,
                "name": "歌莉娅",
                "brandId": 1,
                "totalQuantity": 826352299.0,
                "baseQuantity": 680780351.5,
                "baseContribution": 82.38,
                "qualityContribution": 17.62,
                "specificValue": 0.21
            }
        ],
        brdMean: [
            // {
            //     "id": 1,
            //     "name": "歌莉娅",
            //     "brandId": 1,
            //     "populationAverage": 826352299.0,
            //     "targetPopulation": 680780351.5,
            //     "targetConsumer": 82.38,
            //     "specificValue": 17.62
            // }
        ],
        brdStability: [
            {
                "id": 1,
                "name": "歌莉娅",
                "brandId": 1,
                "functionValue": 12.30012,
                "decayCoefficient": 0.081695,
                "decayRate": 0.081695,
                "stabilityIndex": 5.83
            }
        ]
    };
  },
    components: {
      login,
      footerBar,
      navbar,
      search,
  },
  methods: {
    text () {
      console.log(this.$route.query.mallCode);
    }
  },
  mounted() {
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      axios({
        url: 'dbblog/portal/brand/brand/'+this.$route.query.mallCode,
        method: 'get',
        params: {
            'token': Cookies.get('token')
        }
    }).then(res => {
        arr1.splice(0, 1, res.data.brand.brdQualityRatio);
        arr2.splice(0, 1, res.data.brand.brdMean);
        arr3.splice(0, 1, res.data.brand.brdStability);
        console.log(res.data);
        this.baseSummaryList = res.data.brand.baseSummaryList;
        this.brdQualityRatio = arr1;
        this.brdMean = arr2;
        this.brdStability = arr3;
    }).catch(error => {

    });
  }
}

</script>
<style lang='less'>
@import '~assets/less/main.less';

h6 {
    line-height: 20px;
    margin: 20px 0;
    font-weight: 500;
    font-size: 20px;
    color: #409EFF;
}

.showBrand {
    position: relative;
    //background: #f5f5f5;
    min-height: 1000px;
    padding-top: 30px;
}

.brandInformation {
    width:980px;
    min-height: 850px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}

.hStyle {
    display: inline-block;
    width: 10px;
    height: 20px;
    background: #409EFF;
    position: relative;
    top: 50%;
    transform: translateY(10%);
    margin-right: 50px;
}

.searchBanner {
    background: #6b2049;
    height: 35px;
}

.login {
    bottom: 30px !important;
}
</style>