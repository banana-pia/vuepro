<template>
 <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isShowSms}" @click="isShowSms = true">短信登录</a>
          <a href="javascript:;" :class="{on:!isShowSms}" @click="isShowSms = false">密码登录</a> 
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isShowSms}" >
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="phone"
                v-validate="'required|mobile'">
              <button :disabled="!isRightPhone || computTime>0" class="get_verification" 
                :class="{isRight:isRightPhone}" @click.prevent='sendCode'>
                {{computTime > 0 ? `验证码已发送（${computTime}s)`: "获取验证码"}}
              </button>
            </section>
            <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码"
                v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShowSms}" >
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名"
                   v-model="name" name="name" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwde ? 'text' : 'password'" maxlength="8" placeholder="密码"
                 v-model="pwd" name="pwd" v-validate="'required'">
                <div class="switch_button " @click="isShowPwde = !isShowPwde" :class="isShowPwde? 'on' : 'off'">
                  <div class="switch_circle" :class="{do:isShowPwde}"></div>
                  <span class="switch_text">...</span>
                </div>
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码"
                  v-model="captcha" name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" ref="captcha" @click="updateCaptcha">
                 <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
  
</template>
<script>
import {Toast ,MessageBox} from 'mint-ui'
export default {
  data(){
    return{
      isShowSms:false,
      name:'',
      phone:'',
      code:'',
      isShowPwde:false,
      pwd:"",
      captcha:'',
      computTime: 0
    }
  },
  computed:{
    isRightPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async sendCode(){
      this.computTime = 10
      const interval = setInterval(()=>{
        this.computTime--
        if(this.computTime <= 0){
          this.computTime = 0
          clearInterval(interval)
        }
      },1000)
      const result = await this.$API.reqSendCode(this.phone)
      if(result.code === 0){
        Toast('消息已发送')
      }else{
        MessageBox("提示:", result.msg || "发送失误")
      }
        
    },
    async login () {
        // 进行前台表单验证
        let names
        if (this.isShowSms) {
          names = ['phone', 'code']
        } else {
          names = ['name', 'pwd', 'captcha']
        } 
        const success = await this.$validator.validateAll(names)
        if(success){
          let {isShowSms,name,pwd,phone,code,captcha} = this
          let result
          if(isShowSms){
            result = await this.$API.reqPhoneSws(phone,code)
          }else{
            result = await this.$API.reqPhonePwd(name,pwd,captcha)
            
          }
          if(result.code === 0){
            this.$router.replace({path:"/profile"})
            this.$store.dispatch("saveUser",result.data)
          }
          this.updateCaptcha()
        }
        
    },
    
    updateCaptcha(){
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }

  },

}
</script>
<style scoped lang="stylus" rel="styleshet/stylus">
  @import '../../common/stylus/mixins.styl'
  .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.isRight
                    color:black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px3
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.do 
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
      
</style>