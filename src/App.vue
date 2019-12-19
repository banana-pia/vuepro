<template>
  <div id="">
    <Header></Header>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import Header from "./components/Header/Header"
export default {
  components:{
    Header,
    FooterGuide
  },
  async mounted() {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  },
}
 
</script>
<style lang='stylus' rel="stylesheet/stylus">
</style>
