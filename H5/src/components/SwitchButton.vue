<template>
  <div class="switchbutton">
      <v-panel style="margin-top:0.1rem;">
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="c-panel-title">{{switchText}}</div>
        <v-switch v-model="switchData"  ref="switchs" :hold="true"  @change="contolSwitch"></v-switch>
      </div>
   </v-panel>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    switchData: {
      type: Boolean,
      default: false,
      required: false
    },
    switchText: {
      type: String,
      default: '开关',
      required: false
    },
    streamId: {
      type: String,
      default: 'ScreenDisplay',
      required: false
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods:{
    contolSwitch(data) {
      window.console.log(` 当前值为：${JSON.stringify(data)}`);
       const commod = this.setItem(this.streamId,data ? 1 : 0);
       window.SmartSDK.controlDevice(commod).then((val) => {
         window.console.log(` 当前值为：${JSON.stringify(val)}`);
         this.$refs.switchs.relive();
         this.$emit('changes', data);
      });
    },
    setItem(key,value) {
      const commod = {}
      commod[key] = value;
      return  commod
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
