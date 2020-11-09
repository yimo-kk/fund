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
    <div v-if="loading" style="textAlign: center;paddingTop: 15px;">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <div v-else v-for="item in recommendFundList" :key="item.portfolioCode">
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
        <div class="organization footer-padding" @click=" regardTo"> 
          <p class="footer-p">关于奕丰</p>
        </div>
        <div class="safety footer-padding" @click="team">
          <p class="footer-p">投研团队</p>
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
      loading: false,
      url: process.env.VUE_APP_BASE_URL,
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
      this.loading = true;
      recommendFundGroupData()
        .then((res) => {
          if (res.code === "0000") {
            let arr = [];
            res.data.data.forEach(item=>{
              switch (item.portfolioCode) {
                case "PF0002":
                  item.portfolioSlogan = "气定神闲 稳健增值 ";
                  item.portfolioName = `优诺家 | 稳稳的幸福`;
                  arr[0] = item
                  break;
               case "PF0003":
                  item.portfolioSlogan = "均衡配置 攻守兼备 ";
                  item.portfolioName = `优诺家 | 均衡配置首选`;
                    arr[1] = item
                  break;
               case "FP0004":
                  item.portfolioSlogan = "多元策略 稳中求进 ";
                  item.portfolioName = `优诺家 | 超额收益之王`;
                    arr[2] = item
                  break;
               case "IRESEARCH009":
                  item.portfolioSlogan = "紧贴市场 把握热点主题基金 ";
                  item.portfolioName = `优诺家 | 行业先锋混合`;
                    arr[3] = item
                  break;
               case "IRESEARCH012":
                  item.portfolioSlogan = "明星经理集结 老司机创超额收益 ";
                  item.portfolioName = `优诺家 | 五星经理擒牛`;
                    arr[4] = item
                  break;
                default:
                  break;
              }
            })
            this.recommendFundList = arr;
            this.getData();
          }
        })
        .catch((e) => {
          console.log(e)
          this.loading = false;
          this.$toast(e.message);
        });
    },
    getData() {
      let params = {
        fundCodes: "050026,110011,000746,001668,000934,000751,519732",
      };
      recommendFundData(params)
        .then((res) => {
          this.loading = false;
          let arr = [];
          res.data.data.forEach(item=>{
            switch (item.fundCode) {
              case "050026":
                item.portfolioSlogan = "全民刚需 掘金“药神”板块";
                item.portfolioName = "博时医疗保健";
                arr[0] = item
                break;
              case "110011":
                  item.portfolioSlogan = "高成长性股票 竞争优势明显 ";
                  item.portfolioName = "易方达中小盘混合";
                  arr[1] =item
                break;
              case "000746":
                item.portfolioSlogan = "精选质量高公司 大盘蓝筹值得持有 ";
                item.portfolioName = "招商行业精选";
                arr[2] = item
                break;
              case "001668":
                item.portfolioSlogan = "全球科技引擎 价值投资长期看涨 ";
                item.portfolioName = "汇添富全球互联网混合";
                arr[3] =item
                break;
              case "000934":
                item.portfolioSlogan = "优选大中华优质股票 力争基金长期增值";
                item.portfolioName = "国富大中华精选混合";
                arr[4] = item
                break;
              case "000751":
                item.portfolioSlogan = "优选新兴产业 能涨抗跌业绩抢眼";
                item.portfolioName = "嘉实新兴产业股票 ";
                arr[5] =item
                break;
              case "519732":
                item.portfolioSlogan = "长跑冠军基金界“奥斯卡”获奖者";
                item.portfolioName = "交银双息混合";
                arr[6] = item
                break;
              default:
                break;
            }
          })
          this.recommendFundList.push(...arr);
        })
        .catch((e) => {
          console.log(e)
          this.loading = false;
          this.$toast(e.message);
        });
    },
    fundDetail(data) {
      let url;
      console.log(data.portfolioCode);
      console.log(data.fundCode);
      if (data.portfolioCode == "IRESEARCH012") {
        // https://m.ifastps.com.cn/referral/recommended-portfolio/portfolio-leaflet/IRESEARCH009?portfolioCode=IRESEARCH009&isH5=Y&referral=SYN
        url = `referral/recommended-portfolio/portfolio-leaflet/${data.portfolioCode}?portfolioCode=${data.portfolioCode}&isH5=Y&referral=SYN `;
      } else {
        url = `referral/${
          data.fundCode
            ? "factsheet?fundCode"
            : "recommended-portfolio/details?portfolioCode"
        }=${data.fundCode ? data.fundCode : data.portfolioCode}&referral=SYN`;
      }
      window.location.href = this.url + url;
    },
    regardTo(){
      window.location.href = `${this.url}referral/personal-profile/about-ifast?referral=SYN `
    },
    team(){
      window.location.href = `https://ossmobile.ifastps.com.cn/html/YJSH5/professional.html  `
    }
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
