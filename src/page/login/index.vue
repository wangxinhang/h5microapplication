<template>
  <div style="margin:15px;">
    <van-button size="large" type="default" @click="login">登录</van-button>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 0
    };
  },
  created () {
  },
  methods: {
    login() {
      this.$store.dispatch("LoginByUsername").then(()=>{
        this.$router.push({path:"/index"})
      });
    }
  }
};
</script>

<style>
.van-button {
  margin-bottom: 15px;
}
</style>
