<template>
  <router-layout>
    <van-nav-bar slot="header" title="首页" />
    <van-cell-group>
      <van-cell title="评分" is-link value="Rate" :to="{path:'/rate'}" class="rippleBtn" v-ripple/>
    </van-cell-group>
    <p style="text-align:center;padding-top:30px">所有页面默认开启了缓存<br>请向下滚动</p>
    <van-cell-group style="margin:300px 0 300px">
      <van-cell title="记录滚动条位置" is-link :to="{path:'/rate'}" class="rippleBtn" v-ripple/>
    </van-cell-group>
  </router-layout>
</template>
<script>
import { getList } from "@/api/system/user";

export default {
  data() {
    return {
    }
  },
  created () {
    getList();
  },
};
</script>