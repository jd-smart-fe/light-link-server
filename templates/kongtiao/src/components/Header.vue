<template>
  <div class="header">
     <header class="bg-color" >
        <div class="tempera-box">
          <div class="cur-tempera">
            <span>{{topData}}</span>
            <p>{{topTitle}}{{topUnitText}}</p>
          </div>
        </div>
        <ul>
          <li><span>{{leftData}}</span><p>{{leftTitle}}{{leftUnitText}}</p></li>
          <li><span>{{rightData}}</span><p>{{rightTitle}}{{rightUnitText}}</p></li>
        </ul>
  </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    topData: {
      type: [String , Number],
      default: '--',
      required: false
    },
    topTitle: {
      type: String,
      default: '当前温度',
      required: false
    },
    leftData: {
      type: String,
      default: '自动',
      required: false
    },
    leftTitle:{
      type: String,
      default: '当前模式',
      required: false
    },
    rightData :{
      type: String,
      default: '自动',
      required: false,
    },
     rightTitle :{
      type: String,
      default: '当前风速',
      required: false,
    },
    topUnit:{
      type: String,
      default: '°c',
      required: false,
    },
    leftUnit:{
      type: String,
      default: '',
      required: false,
    },
    rightUnit:{
      type: String,
      default: '档',
      required: false,
    },
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  computed: {
    leftUnitText() {
      if (this.leftUnit !== '') {
        return `(${this.leftUnit})`
      } else {
        return ''
      }
    },
    rightUnitText() {
      if (this.rightUnit !== '') {
        return `(${this.rightUnit})`
      } else {
        return ''
      }
    },
    topUnitText() {
      if (this.topUnit !== '') {
        return `(${this.topUnit})`
      } else {
        return ''
      }
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
