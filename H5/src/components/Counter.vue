<template>
  <div class="counter">
    <v-panel style="margin-top:0.1rem;">
      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title ">{{counterText}}
          <div class="number-text" style="color:rgb(89, 184, 252);">
            {{counterData}}
          </div>
        </div>
        <v-counter
          slot="main"  v-model="TemperatureSet"
          :max="counterMax" :min="counterMin" :step="counterStep"  @change="contolCounter" >
        </v-counter>
      </div>
    </v-panel>
  </div>
</template>

<script>
let vmCounter;

export default {
  name: 'Counter',
  props: {
    counterData: {
      type: Number,
      default: 22,
      required: false
    },
    counterText: {
      type: String,
      default: '温度设置',
      required: false
    },
    counterMax: {
      type: Number,
      default: 32,
      required: false
    },
    counterMin: {
      type: Number,
      default: 16,
      required: false
    },
    counterStep: {
      type: Number,
      default: 1,
      required: false
    },
    streamId: {
      type: String,
      default: 'TemperatureSet',
      required: false
    }
  },
  data () {
    return {
      TemperatureSet: this.counterData,
      msg: 'Welcome to Your Vue.js App',
    }
  },
  watch:{
    counterData:(val) => {
      vmCounter.TemperatureSet = val
    }
  },
  mounted() {
    vmCounter = this
  },
  methods:{
    contolCounter(data) {
      window.console.log(data);
     const commod = this.setItem(this.streamId,data);
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
