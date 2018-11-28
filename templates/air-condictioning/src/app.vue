<template>
  <div id="app">
    
    <Header
      :topTitle = "header.topTitle"
      :leftTitle = "header.leftTitle"
      :rightTitle = "header.rightTitle"
      :topData = "header.topData"
      :leftData = "header.leftData"
      :rightData = "header.rightData"
      :topUnit = "header.topUnit"
      :leftUnit = "header.leftUnit"
      :rightUnit = "header.rightUnit"
    />
    
    
    <Power
      :powerState = "power.powerState"
      :powerText = "power.powerText"
      @changes="updatePower"
      :streamId ="power.streamId"
    />
    
    
    
    <Modes
      :modeText="modes.modeText"
      :modeData="modes.modeData"
      :modeValue="modes.modeValue"
      @changes="updateMode"
      :streamId ="modes.streamId"
    />
    
    
    <WindRang
      :windRangData="rang.windRangData"
      :windRangText="rang.windRangText"
      :windRangValues="rang.windRangValues"
      :streamId = "rang.streamId"
      @changes="updateRang"
    />
    
    
    <SwitchButton
      :switchData="switchs.sh1.switchData"
      :switchText="switchs.sh1.switchText"
      :streamId = "switchs.sh1.streamId"
      @changes= "updateSh1"
    />
    
    
    <SwitchButton
      :switchData="switchs.sh2.switchData"
      :switchText="switchs.sh2.switchText"
      :streamId = "switchs.sh2.streamId"
      @changes= "updateSh2"
    />
    
    
    <SwitchButton
      :switchData="switchs.sh3.switchData"
      :switchText="switchs.sh3.switchText"
      :streamId = "switchs.sh3.streamId"
      @changes= "updateSh3"
    />
    

    <div style="height: 20px;"></div>
    <div class="mask" v-show="mengban"></div>
  </div>
</template>

<script>
import Header from './components/Header'
import Power from './components/Power'
import Modes from './components/Modes'
import Counter from './components/Counter'
import WindRang from './components/WindRang'
import SwitchButton from './components/SwitchButton'

export default {
  name: 'App',
  components: {
    Header,Power,Modes,Counter,WindRang,SwitchButton
  },
  data() {
    return {
      mengban: false,
      pevDate: {},
      header: {
        topData: '--',
        topTitle: '当前温度12',
        leftTitle: '当前模式34',
        rightTitle: '当前风速56',
        leftData: '自动',
        rightData: '自动',
        topUnit:'°c',
        leftUnit: '',
        rightUnit:'档'
      },
      power: {
        powerState: true,
        powerText: '设备已关闭',
        streamId: 'Power',
      },
      counter: {
        counterData: 22,
        counterText: '温度设置',
        counterMax: 32,
        counterMin: 16,
        counterStep: 1,
        streamId: 'TemperatureSet',
      },
      modes: {
        modeValue: 0,
        streamId: 'Mode',
        modeText: '模式设置0000',
        modeData: [{"id":0,"text":"自动0","icon":"icon-mode-automatic"},{"id":1,"text":"制冷1","icon":"icon-mode-freeze"},{"id":2,"text":"制热2","icon":"icon-mode-holiday"},{"id":3,"text":"除湿","icon":"icon-mode-dry"},{"id":4,"text":"送风","icon":"icon-range-large"},{"id":5,"text":"智能","icon":"icon-mode-smart"},{"id":6,"text":"通风","icon":"icon-mode-cool"}],
      },
      rang: {
        streamId: 'Wind',
        windRangData: {value: 0, text: '自动'},
        windRangText: '风速调节123',
        windRangValues: [{"value":0,"text":"自动"},{"value":1,"text":"微风"},{"value":2,"text":"低风"},{"value":3,"text":"中风"},{"value":4,"text":"高风"},{"value":5,"text":"静音"},{"value":6,"text":"自然"}],
      },
      switchs: {
        sh1:{
          streamId: 'ScreenDisplay',
          switchData: false,
          switchText: '屏显123'
        },
        sh2: {
          streamId: 'Mute',
          switchData: false,
          switchText: '静音123'
        },
        sh3: {
          streamId: 'Sleep',
          switchData: false,
          switchText: '睡眠123'
        }
      }
    }
  },
  mounted() {
    window.JDSMART.ready(() => {
      this.initData();
      this.setIntervalOfTimeOut(4000);
    });
  },
  methods:{
    setIntervalOfTimeOut(times) {
      setTimeout(() => {
        this.gerSnapshots();
        this.setIntervalOfTimeOut(times);
      }, times);
    },
    initData() { // 获取初始化设备数据
      window.SmartSDK.initDevice().then((json) => {
        // 解析在线状态
        const devices = json.device;
        const state = devices.status;
        const streams = json.streams;
        this.isOnlineState(state);
        this.resolveStreams(streams);
      });
    },
    isOnlineState(state) { // 判断在线状态
      if (window.parseInt(state) === 1) {
        this.mengban = false;
        window.SmartSDK.setOnlineStatus(false);
      } else {
        this.mengban = true;
        window.SmartSDK.setOnlineStatus(true);
      }
    },
    gerSnapshots() {
      window.SmartSDK.getSnapshot().then((json) => {
        const stast = json.device ? json.device.status : json.status;
        window.console.log(JSON.stringify(json.streams));
        this.isOnlineState(stast);
        this.resolveStreams(json.streams);
      });
    },
    resolveStreams(data) {
      const streamObj = {};
      data.forEach((val) => {
        if (val.stream_id === 'Power') {
          streamObj.Power = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'Mode') {
          streamObj.Mode = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'Wind') {
          streamObj.Wind = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'CurrentTemperature') {
          streamObj.CurrentTemperature = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'TemperatureSet') {
          streamObj.TemperatureSet = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'Mute') {
          streamObj.Mute = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'Sleep') {
          streamObj.Sleep = window.parseInt(val.current_value);
        }
        if (val.stream_id === 'ScreenDisplay') {
          streamObj.ScreenDisplay = window.parseInt(val.current_value);
        }
      });
      this.diffObject(streamObj);
    },
    diffObject(obj) {
      const self = this;
      if (self.pevDate === '') {
        self.pevDate = obj;
        self.renderHtml(obj);
        window.console.log('快照：初始化快照');
      } else {
        try {
          const arrDate = window.SmartSDK.diffForObject(self.pevDate, obj);
          if (arrDate[0]) {
            self.pevDate = obj;
            window.console.log(JSON.stringify(arrDate[1]))
            self.renderHtml(arrDate[1]);
            window.console.log('快照：对比不相同');
          } else {
            window.console.log('快照：对比相同');
          }
        } catch (e) {
          window.SmartSDK.toast('快照解析异常');
        }
      }
    },
    renderHtml(data) {
      // 当前温度
      this.header.topData = (data.CurrentTemperature !== null && data.CurrentTemperature !== undefined) ? data.CurrentTemperature : '--';
      // 设备开关
      if (data.Power === 1) {
        this.power.powerState = false; // 开关状态  背景深蓝为开  否则为关 ，如何定义可根据UI及交互设计确定
        this.powerText = '设备已开启';
      } else {
        this.power.powerState = true; // 开关状态  背景深蓝为开  否则为关 ，如何定义可根据UI及交互设计确定
        this.powerText = '设备已关闭';
      }
      // 当前模式
      this.modes.modeValue = (data.Mode !== null) ? data.Mode : 0;
      this.modes.modeData.forEach((val) => {
        if (val.id === data.Mode) {
          this.header.leftData = val.text;
        }
      });
      // 当前风速
      this.rang.windRangValues.forEach((val) => {
        if (val.value === data.Wind) {
          this.rang.windRangData = val
          this.header.rightData = val.text;
        }
      });
      // 温度设置
      this.counter.counterData = (data.TemperatureSet !== null) ? data.TemperatureSet : 22;
     // 屏显
      this.switchs.sh1.switchData = data.ScreenDisplay === 1;
       // 静音
      this.switchs.sh2.switchData = data.Mute === 1;
      // 睡眠
      this.switchs.sh3.switchData = data.Sleep === 1;
    },

    updatePower(data) {
      if (data) {
        this.power.powerState = true;
        this.power.powerText = '设备已关闭';
      } else {
        this.power.powerState = false;
        this.power.powerText = '设备已开启';
      }
    },
    updateMode(data) {
      this.modes.modeValue = data;
      this.modes.modeData.forEach((val) => {
         if (val.id === data) {
           this.header.leftData = val.text;
         }
      })
    },
    updateCounter(data) {
      this.counter.counterData = data;
    },
    updateRang(data) {
      this.rang.windRangData = data;
      this.header.rightData = data.text;
    },
    updateSh1(data) {
       this.switchs.sh1.switchData = data;
    },
    updateSh2(data) {
       this.switchs.sh2.switchData = data;
    },
    updateSh3(data) {
       this.switchs.sh3.switchData = data;
    },
  },
}
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
