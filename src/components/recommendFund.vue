<template>
  <div style="  position: relative;" @click="fundDetail()">
    <div class="recommend-item">
      <div class="earnings-info flex-column">
        <p class="earnings">+{{recommendFund.historyPerformanceYear1}}%</p>
        <span class="earnings-text subTitle">近一年收益率</span>
      </div>
      <div class="title-info flex-column">
        <p class="title">{{recommendFund.portfolioName}}</p>
        <span class="subTitle">{{recommendFund.portfolioSlogan}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendFund: Object
  },
  data() {
    return {};
  },
  methods: {
    fundDetail() {
      this.$emit("fundDetail");
    }
  },
  mounted() {
    console.log(this.recommendFund);
    debugger;
  }
};
</script>
<style lang="less" scoped>
.recommend-item {
  height: 96px;
  width: 100%;
  padding: 28px 0;
  display: flex;
  background-color: #fff;
  //   border-top: .5px solid #eee;
}
.recommend-item ::before {
  content: "";
  width: 100%;
  height: 0.5px;
  background-color: #eee;
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleY(0.5);
}
.earnings {
  font-size: 20px;
  color: #f74c50;
}
.earnings-info {
  width: 131px;
  padding-left: 20px;
}
.title-info {
  border-left: 0.5px solid #eee;
  padding-left: 28px;
}
.title {
  font-size: 16px;
  color: #333333;
}
.subTitle {
  margin-top: 1px;
  font-size: 12px;
  color: #b6b6b6;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>