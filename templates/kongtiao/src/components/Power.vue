<template>
  <div class="power">
    <v-panel style="width:100%;margin-top:0;">
      <div slot="body" class="c-panel-body row-2 u-cross-center" >
        <div slot="title" class="c-panel-title">{{powerText}}</div> <!-- 根据具体UI修改  文本颜色-->
          <v-button-switch  v-model="powerState" icon="v-icon-power"  :syncHold="true" radius="circle" @change="contolPorwer"></v-button-switch>
      </div>
    </v-panel>
  </div>
</template>

<script>
export default {
  name: 'Power',
  props: {
    powerState: {
      type: Boolean,
      default: true,
      required: false
    },
    powerText: {
      type: String,
      default: '设备已关闭',
      required: false
    },
    streamId: {
      type: String,
      default: 'Power',
      required: false
    }

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // powerState: true,
    }
  },
  methods:{
  contolPorwer(data) {
       const value =  data ? 0 : 1;
       const commod = this.setItem(this.streamId,value);
       window.SmartSDK.controlDevice(commod).then((val) => {
         window.console.log(` 当前值为：${JSON.stringify(val)}`);
         this.$emit('changes', data);
      });
  },
  setItem(key,value) {
    const commod = {}
    commod[key] = value;
    return  commod
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
