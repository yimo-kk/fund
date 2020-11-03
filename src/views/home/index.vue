<template>
  <div class="body">
    <div class="banner flex-up-down">
      <p class="fund-title">我的基金</p>
      <div class="user-login">
        <p class="register long-btn flex-center" @click="register">注册账户</p>
        <p class="login long-btn flex-center" @click="login">立即登录</p>
      </div>
    </div>
    <div @click="search">
      <van-search
        v-model="searchData"
        background="#F8F7F7"
        placeholder="点此搜索基金"
        disabled
      />
    </div>

    <div class="menus">
      <ul class="menus-list">
        <li
          v-for="item in menuList"
          :key="item.id"
          class="menu-item flex-up-down"
          @click="menuClick(item.id)"
        >
          <img class="menu-item-img" :src="item.url" alt />
          <span class="menu-item-text">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="padding-body wallet-margin recommend">
      <div class="recommend-title">
        <p class="recommend">现金钱包</p>
      </div>
      <div class="wallet" @click="wallet">
        <div class="wallet-content">
          <p class="wallet-p">+2.37%</p>
          <span class="wallet-sapn">最高七日年化收益率</span>
        </div>
      </div>
    </div>
    <div class="padding-body">
      <div class="recommend-title">
        <p class="recommend">推荐基金</p>
      </div>
    </div>
    <div v-for="item in recommendFundList" :key="item.portfolioCode">
      <recommend-fund
        :recommendFund="item"
        @fundDetail="fundDetail"
      ></recommend-fund>
    </div>

    <div class="padding-body footer-margin">
      <div class="recommend-title">
        <p class="recommend">安全保障</p>
      </div>
      <div class="footer">
        <div class="organization footer-padding">
          <p class="footer-p">挂牌机构合作</p>
          <span class="footer-span">合法合规</span>
        </div>
        <div class="safety footer-padding">
          <p class="footer-p">用户信息安全</p>
          <span class="footer-span">国家公安部认证</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recommendFund from "@/components/recommendFund";
import { recommendFundData, recommendFundGroupData } from "@/api";

export default {
  components: {
    recommendFund,
  },
  props: {},
  data() {
    return {
      url: process.env.VUE_APP_REQURST_BASE_URL,
      banner: require("../../assets/img/banner.png"),
      searchData: "",
      menuList: [
        {
          id: 1,
          name: "基金排行",
          url: require("../../assets/img/ranking.png"),
        },
        {
          id: 2,
          name: "精选私募",
          url: require("../../assets/img/private.png"),
        },
        {
          id: 3,
          name: "智能投顾",
          url: require("../../assets/img/investment.png"),
        },
        {
          id: 4,
          name: "精选基金",
          url: require("../../assets/img/featured.png"),
        },
      ],
      recommendFundList: [],
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getRecommendFundData();
  },
  mounted() {},
  methods: {
    register() {
      window.location.href = `${this.url}referral/register?referral=SYN`;
    },
    login() {
      window.location.href = `${this.url}referral/login?referral=SYN`;
    },
    search(val) {
      window.location.href = `${this.url}referral/fund-selector?referral=SYN`;
    },
    menuClick(val) {
      if (val === 1) {
        window.location.href = `${this.url}referral/fund-ranking?referral=SYN`;
      } else if (val === 2) {
        window.location.href = `${this.url}referral/login?redirectUrl=https://mobile.ifastps.com.cn/simu/fund-list?referral=SYN&integrationMode=encryption&isFactsheet=Y`;
      } else if (val === 3) {
        window.location.href = `${this.url}referral/robo/home?referral=SYN`;
      } else if (val === 4) {
        window.location.href = `${this.url}referral/recommended-fund?referral=SYN`;
      }
    },
    wallet() {
      window.location.href = `${this.url}referral/cash-wallet/details?referral=SYN`;
    },
    getRecommendFundData() {
      recommendFundGroupData()
        .then((res) => {
          if (res.code === "0000") {
            res.data.data[0].portfolioSlogan = "紧贴市场 把握热点主题基金";
            res.data.data[0].portfolioName = "优诺家 I 行业先锋混合";
            res.data.data[2].portfolioSlogan = "均衡配置 基金也有性价比";
            res.data.data[2].portfolioName = "优诺家 I 超额收益之王";
            res.data.data[1].portfolioSlogan = "历经牛熊 十亿级资金跟投";
            res.data.data[1].portfolioName = "优诺家 I 稳稳的幸福";
            this.recommendFundList = res.data.data;
            this.getData();
          }
        })
        .catch((e) => {
          this.$toast(e.message);
        });
    },
    getData() {
      let params = {
        fundCodes: "050026,001984,000083,000751,519732,000217,110007",
      };
      recommendFundData(params)
        .then((res) => {
          let arr = [];
          res.data.data[0].portfolioSlogan = "全民刚需 掘金“药神”板块";
          res.data.data[0].portfolioName = "博时医疗保健";
          // arr[0]= res.data.data[0];
          res.data.data[1].portfolioSlogan = "放眼全球 万里挑医好药企";
          res.data.data[1].portfolioName = "上投摩根中国生物医药(QDII)";
          // this.recommendFundList[4]= res.data.data[4];
          // arr[1]= res.data.data[1];
          res.data.data[2].portfolioSlogan = "名家操盘 打造内需消费名片";
          res.data.data[2].portfolioName = "汇添富消费行业混合";
          // this.recommendFundList[5]= res.data.data[5];
          // arr[2]= res.data.data[5];
          res.data.data[3].portfolioSlogan = "优选新兴产业 能涨抗跌业绩抢眼";
          res.data.data[3].portfolioName = "嘉实新兴产业股票";
          // this.recommendFundList[6]= res.data.data[6];
          //  arr[3]= res.data.data[6];
          res.data.data[4].portfolioSlogan = "长跑冠军 基金界“奥斯卡”获奖者";
          res.data.data[4].portfolioName = "交银双息平衡混合";
          // this.recommendFundList[7]= res.data.data[7];
          //  arr[4]= res.data.data[7];
          res.data.data[5].portfolioSlogan = "全球量化宽松 把握黄金投资";
          res.data.data[5].portfolioName = "华安黄金易 ETF 连接 C";
          // this.recommendFundList[8]= res.data.data[8];
          //  arr[5]= res.data.data[6];
          res.data.data[6].portfolioSlogan = "明星债基 低风险投资首选";
          res.data.data[6].portfolioName = "易方达稳健收益债券";
          // this.recommendFundList[9]= res.data.data[9];
          this.recommendFundList.push(...res.data.data);
          console.log(this.recommendFundList);
        })
        .catch((e) => {
          this.$toast(e.message);
        });
    },
    fundDetail(data) {
      console.log(data);
      debugger;
      let url;
      data.portfolioCode
        ? (url = `referral/recommended-portfolio/portfolio-leaflet/${data.portfolioCode}?portfolioCode=${data.portfolioCode}&isH5=Y&referral=SYN`)
        : (url = `referral/factsheet?fundCode=${data.fundCode}&referral=SYN`);

      window.location.href = this.url + url;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>