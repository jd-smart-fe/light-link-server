<template>
  <div class="windrang">
     <!--风速-->
    <v-panel style="margin-top:0.1rem;">
      <div slot="header" class="c-panel-header row-1 u-cross-center">{{windRangText}}</div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" v-model="windRang" :is-step="true" @change="contolRang" :dots="windRangValues">
        </v-range>
      </div>
    </v-panel>
  </div>
</template>

<script>
let vmRang;

export default {
  name: 'WindRang',
  props: {
    windRangData: {
      type: Object,
      default: () => ({text: '最小', value: 0}),
      required: false
    },
    windRangText: {
      type: String,
      default: '风速调节',
      required: false
    },
    windRangValues: {
      type: Array,
      default: () => [{text: '最小', value: 0}, {text: "最大", value : 1}],
      required: false
    },
    streamId:{
      type: String,
      default: 'Wind',
      required: false
    }
  },
  data () {
    return {
      windRang: this.windRangData,
    }
  },
  watch: {
    windRangData:(val) => {
      vmRang.windRang = val
      // console.log(val)
    }
  },
  mounted() {
    vmRang = this
  },
  methods:{
    contolRang(data) {
     const commod = this.setItem(this.streamId,data.value);
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
