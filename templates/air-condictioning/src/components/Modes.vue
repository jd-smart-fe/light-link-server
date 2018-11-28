<template>
  <div class="modes">
    <v-panel style="margin-top:0.1rem;">
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">{{modeText}}</div>
      </div>
      <div slot="body" class="c-panel-body u-without-padding" v-for= "(list, index) in modeArrList" :key="index">
        <v-modes  v-model="mode" key="index"
          :numberal="4" :items="list" @change="contolMode"
        ></v-modes>
       </div>
      </v-panel>
  </div>
</template>

<script>
let vmMode;

export default {
  name: 'Modes',
  props: {
    modeData: {
      type: Array,
      default: () => [],
      required: false
    },
    modeText: {
      type: String,
      default: '模式设置',
      required: false
    },
    modeValue: {
      type: Number,
      default: 0,
      required: false,

    },
    streamId: {
      type: String,
      default: 'Mode',
      required: false
    }
  },
  watch:{
    modeValue:(val) => {
      vmMode.mode = val
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      modeArrList: [],
      mode: 0,
    }
  },
  mounted() {
   vmMode = this
   this.modeList();
  },
  methods:{
    contolMode(data) {
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
    },
    modeList() {
      const modeList = [];
      const lengt = this.modeData.length / 4;
      for (let i = 0; i < lengt ; i++) {
          const list = [];
          for(let j = 0; j <= 3; j++) {
            const ele = this.modeData[i*4+j];
            if (ele === undefined) {
               break;
            }
            list.push(ele);
          }
         modeList.push(list);
      }
      this.modeArrList = modeList;
      // console.log(JSON.stringify(modeList));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
