<template>
  <div id="app">
    <!-- 空调头部状态显示 -->
  <header class="green_bg" >
        <div class="temperabox">
          <div class="cur_tempera">
            <span>{{curtemp}}</span>
            <p>当前温度°c</p>
          </div>
        </div>
        <ul>
          <li><span>{{mode}}</span><p>当前模式</p></li>
          <li><span>{{mark}}</span> 档<p>当前风速</p></li>
        </ul>
  </header>
  <!--空调开关 参考: https://github.com/jd-smart-fe/vue-stone/blob/master/examples/pages/switch.vue -->
    <v-panel style="width:100%;margin-top:0;"> <!-- 根据具体UI修改  开关栏与头部宽度和间距-->
      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title" style="color:rgb(89, 184, 252);" >{{power_state_text}}</div> <!-- 根据具体UI修改  文本颜色-->
        <v-power slot="main" ref="power" :hold="true" v-model="power_state"></v-power>
      </div>
    </v-panel>
  <!--温度设置 参考：https://github.com/jd-smart-fe/vue-stone/blob/master/examples/pages/counter.vue -->
   <v-panel>
      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title ">温度设置
          <div class="number-text" style="color:rgb(89, 184, 252);">
            {{ settemp }}℃
          </div>
        </div>
        <v-counter
          slot="main" ref="counter" v-model="settemp"
          :max="32" :min="16" :step="1" >
        </v-counter>
      </div>
    </v-panel>
    <!--模式设置 参考：https://github.com/jd-smart-fe/vue-stone/blob/master/examples/pages/modes.vue -->
  <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">模式设置</div>
      </div>
      <div slot="body" class="c-panel-body row-2 u-without-padding">
        <v-modes v-model="gridActiveId"  ref="modesUp"
          :numberal="3" :items="gridDataUp"
        ></v-modes>
      </div>
      <div slot="body" class="c-panel-body row-2 u-without-padding">
       <v-modes v-model="gridActiveId" ref="modesDown"
          :numberal="2" :items="gridDataDown"
        ></v-modes>
      </div>
  </v-panel>
  <!--风速设置 参考：https://github.com/jd-smart-fe/vue-stone/blob/master/examples/pages/range.vue -->
 <v-panel>
  <div slot="header" class="c-panel-header row-1 u-cross-center">风速调节</div>
  <div slot="body" class="c-panel-body row-3 u-cross-center">
    <v-range slot="main" ref="rangeObj" v-model="range_value" :is-step="true" :dots="dots">
    </v-range>
  </div>
 </v-panel>
  <!--开关按钮 参考：https://github.com/jd-smart-fe/vue-stone/blob/master/examples/pages/switch.vue -->
 <v-panel>
  <div slot="body" class="c-panel-body u-cross-center">
    <div class="c-panel-title">节能</div>
      <v-switch v-model="ecomode" ref="ecomode" :hold="true"  ></v-switch>
  </div>
 </v-panel>
  <v-panel>
  <div slot="body" class="c-panel-body u-cross-center">
    <div class="c-panel-title">睡眠</div>
      <v-switch v-model="sleepmode" ref="sleepmode" :hold="true"  ></v-switch>
  </div>
 </v-panel>
  <v-panel>
  <div slot="body" class="c-panel-body u-cross-center">
    <div class="c-panel-title">屏显</div>
      <v-switch v-model="scrdispaly" ref="scrdispaly" :hold="true" ></v-switch>
  </div>
 </v-panel>

  <div class="mask" v-show="show"></div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      show: false,
      curtemp: '--', // 当前温度
      mode: '制冷', // 模式
      mark: '自动', // 风速
      power_state: false, // 开关状态  背景深蓝为开  否则为关 ，如何定义可根据UI及交互设计确定
      power_state_text: '空调已关闭', // 默认为关
      settemp: 22, // 设置温度
      gridActiveId: 0, // 控模式的显示索引
      gridDataUp: [{ // 模式样式数组
        text: '自动',
        icon: 'automoatic',
        id: 4,
      }, {
        text: '除湿',
        icon: 'mode-dry',
        id: 3,
      }, {
        text: '送风',
        icon: 'mode-cool',
        id: 2,
      }],
      gridDataDown: [{
        text: '制冷',
        icon: 'mode-freeze',
        id: 0,
      }, {
        text: '制热',
        icon: 'mode-holiday',
        id: 1,
      }],
      range_value: { // 当前值
        value: 0,
        text: '自动',
      },
      dots: [ // 滑杆节点
        {
          value: 0,
          text: '自动',
        },
        {
          value: 1,
          text: '低风',
        },
        {
          value: 2,
          text: '中风',
        },
        {
          value: 3,
          text: '高风',
        },
        {
          value: 4,
          text: '强力',
        },
        {
          value: 5,
          text: '静音',
        },
      ],
      ecomode: false, // 节能
      sleepmode: false, // 睡眠
      scrdispaly: false, // 屏县
      pevDate: '',
    };
  },
  mounted() {
    window.JDSMART.ready(() => {
      this.init();
      setInterval(() => {
        this.gerSnapshots();
      }, 4000);
    });
    this.$refs.power.$on('change', (state) => { // 注册控制方法
      // 通过控制返回是否成功判定是否改变当前状态 或者 通过轮询状态更新进行修改
      const values = this.power_state ? 0 : 1;
      window.SmartSDK.controlDevice({ power: values }, (data) => {
        this.power_state = !this.power_state;
        this.power_state_text = this.power_state ? '空调已开启' : '空调已关闭';
        window.console.log(` 当前值为：${data}`);
      });
      window.console.log(` 当前值为：${state}`);
    });
    // 注册温度设置实现方法
    this.$refs.counter.$on('increase', (val) => { // 加
      // 当设置温度为最大时 可判断是否需要下发指令本模版不做判断
      window.SmartSDK.controlDevice({ settemp: val }, (data) => {
        window.console.log(`当前值为：${data}`);
      });
    });
    this.$refs.counter.$on('decrease', (val) => { // 减
      // 当设置温度为最小时 可判断是否需要下发指令本模版不做判断
      window.SmartSDK.controlDevice({ settemp: val }, (data) => {
        window.console.log(`当前值为：${data}`);
      });
    });
    // 注册模式控制方法
    this.$refs.modesDown.$on('change', (state) => {
      window.SmartSDK.controlDevice({ mode: state }, (data) => {
        window.console.log(` 当前值为：${data}`);
        const modeArr = ['制冷', '制热', '除湿', '送风', '自动'];
        this.mode = modeArr[state];
      });
    });
    this.$refs.modesUp.$on('change', (state) => {
      window.SmartSDK.controlDevice({ mode: state }, (data) => {
        window.console.log(`当前值为：${data}`);
        const modeArr = ['制冷', '制热', '除湿', '送风', '自动'];
        this.mode = modeArr[state];
      });
    });
    // 注册风速调节
    this.$refs.rangeObj.$on('change', (value) => {
      window.SmartSDK.controlDevice({ mark: value.value }, (data) => {
        window.console.log(` 当前值为：${data}`);
        this.mark = value.text;
      });
    });
    this.$refs.ecomode.$on('change', (state) => { // change state的状态是改变后的值故   this.ecomode = false state为 true 反之为false
      const val = this.ecomode ? 0 : 1;
      window.SmartSDK.controlDevice({ ecomode: val }, (data) => {
        window.console.log(` 当前值为：${data}`);
        this.ecomode = state;
      });
    });
    this.$refs.sleepmode.$on('change', (state) => {
      const val = this.sleepmode ? 0 : 1;
      window.SmartSDK.controlDevice({ sleepmode: val }, (data) => {
        window.console.log(` 当前值为：${data}`);
        this.sleepmode = state;
      });
    });
    this.$refs.scrdispaly.$on('change', (state) => {
      const val = this.scrdispaly ? 0 : 1;
      window.SmartSDK.controlDevice({ scrdispaly: val }, (data) => {
        window.console.log(` 当前值为：${data}`);
        this.scrdispaly = state;
      });
    });
  },
  methods: {
    init() { // 初始化数据
      window.SmartSDK.initDevice((json) => {
        // 解析在线状态
        const devices = json.device;
        const state = devices.status;
        const streams = json.streams;
        this.isOnlineState(state);
        this.resolveStreams(streams);
      });
    },
    resolveInit() { // 判断是否在线，获取feedid等信息 此产品暂时不需要feedid
      // 获取
    },
    gerSnapshots() {
      window.SmartSDK.getSnapshot((json) => {
        // this.logs = JSON.stringify(json.status);
        const stast = json.device ? json.device.status : json.status;
        this.isOnlineState(stast);
        this.resolveStreams(json.streams);
      }, (err) => {
        window.console.log(`当前值为：${err}`);
      });
    },
    isOnlineState(data) { // 判断是否在线
      if (window.parseInt(data) === 1) {
        this.show = false;
        window.SmartSDK.isOnlines(false);
      } else {
        this.show = true;
        window.SmartSDK.isOnlines(true);
      }
    },
    resolveStreams(data) { // 解析参数
      const streamObj = {};
      data.forEach((val) => {
        if (val.stream_id === 'power') {
          streamObj.power = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'curtemp') {
          streamObj.curtemp = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'ecomode') {
          streamObj.ecomode = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'mark') {
          streamObj.mark = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'mode') {
          streamObj.mode = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'scrdispaly') {
          streamObj.scrdispaly = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'settemp') {
          streamObj.settemp = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'sleepmode') {
          streamObj.sleepmode = window.parseInt(val.current_value);
        }
      });
      this.diffObject(streamObj);
    },
    diffObject(obj) {
      const self = this;
      if (self.pevDate === '') {
        self.pevDate = obj;
        self.renderHtml(obj);
        self.logs = 'nihasdofsd不相同';
      } else {
        try {
          const arrDate = window.SmartSDK.diffForObject(self.pevDate, obj);
          if (arrDate[0]) {
            self.pevDate = obj;
            self.renderHtml(arrDate[1]);
            self.logs = '不相同';
          } else {
            self.logs = '快照相同';
          }
        } catch (e) {
          window.SmartSDK.toast('快照解析异常');
        }
      }
    },
    renderHtml(data) { // 页面渲染
      this.clogs += 1;
      // 当前温度
      this.curtemp = (data.curtemp !== null && data.curtemp !== undefined) ? data.curtemp : '--';
      // 设备开关
      if (data.power && data.power === 1) {
        this.power_state = true; // 开关状态  背景深蓝为开  否则为关 ，如何定义可根据UI及交互设计确定
        this.power_state_text = '空调已开启';
      } else {
        this.power_state = false; // 开关状态  背景深蓝为开  否则为关 ，如何定义可根据UI及交互设计确定
        this.power_state_text = '空调已关闭';
      }
      // 当前模式
      this.gridActiveId = (data.mode && data.mode !== null) ? data.mode : 0;
      const modeArr = ['制冷', '制热', '除湿', '送风', '自动'];
      this.mode = modeArr[this.gridActiveId];
      // 当前风速
      const markS = (data.mark && data.mark !== null) ? data.mark : 0;
      const markArr = [{ value: 0, text: '自动' },
      { value: 1, text: '低风' },
      { value: 2, text: '中风' },
      { value: 3, text: '高风' },
      { value: 4, text: '强力' },
      { value: 5, text: '静音' }];
      this.mark = markArr[markS].text;
      this.range_value = markArr[markS];
      // 当前温度设置
      this.settemp = (data.settemp && data.settemp !== null) ? data.settemp : 22;
       // 节能模式
      this.ecomode = (data.ecomode && data.ecomode === 1);
      // 睡眠
      this.sleepmode = (data.sleepmode && data.sleepmode === 1);
      // 屏显
      this.scrdispaly = (data.scrdispaly && data.scrdispaly === 1);
      // 左右摆动
      // 上下摆动
    },
  },
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
