<template>
  <div id="app">
    <div class='box'></div>
  </div>
</template>

<script>
export default {

}
 
</script>
<style lang='stylus' rel="stylesheet/stylus">

  $color = green  
  boxStyle(w,h,bg)
    width w
    height h
    border none 
    background bg
  .box
    boxStyle(100px,100px,$color)

</style>
