import Replace from '../dal/ReplaceTemplates/Replace';

const H5Data = {
  curtemp: '当前温度------',
  key: '测试数据',
  templateName: 'air-condictioning',
  productId: '',
  data: {
    header: {
      type: 'Header',
      is_show: true,
      des_curtemp: '当前温度12',
      des_pattern: '当前模式34',
      des_speed: '当前风速56',
    },
    power: {
      type: 'Power',
      is_show: true,
      status: {
        0: '设备已关闭',
        1: '设备已开启',
      },
    },
    counter: {
      type: 'Counter',
      is_show: false,
      title: '温度设置',
    },
    modes: {
      type: 'Modes',
      is_show: true,
      title: '模式设置666689898999',
      modeData: JSON.stringify([
        {
          id: 0,
          text: '自动0',
          icon: 'icon-mode-automatic',
        },
        {
          id: 1,
          text: '制冷1',
          icon: 'icon-mode-freeze',
        },
        {
          id: 2,
          text: '制热2',
          icon: 'icon-mode-holiday',
        },
        {
          id: 3,
          text: '除湿',
          icon: 'icon-mode-dry',
        },
        {
          id: 4,
          text: '送风',
          icon: 'icon-range-large',
        },
        {
          id: 5,
          text: '智能',
          icon: 'icon-mode-smart',
        },
        {
          id: 6,
          text: '通风',
          icon: 'icon-mode-cool',
        },
      ]),
    },
    windRang: {
      type: 'WindRang',
      is_show: true,
      title: '风速调节123',
      windRangValues: JSON.stringify([
        {
          value: 0,
          text: '自动',
        },
        {
          value: 1,
          text: '微风',
        },
        {
          value: 2,
          text: '低风',
        },
        {
          value: 3,
          text: '中风',
        },
        {
          value: 4,
          text: '高风',
        },
        {
          value: 5,
          text: '静音',
        },
        {
          value: 6,
          text: '自然',
        },
      ]),
    },
    screenDisplay: {
      type: 'ScreenDisplay',
      is_show: true,
      title: '屏显123',
    },
    mute: {
      type: 'Mute',
      is_show: true,
      title: '静音123',
    },
    sleep: {
      type: 'Sleep',
      is_show: true,
      title: '睡眠123',
    },
  },
};

const replace = new Replace(H5Data);
// replace.cpDir(uuid);
(async () => {
  const reslut = await replace.replaceTemplates();

  // await replace.cpdir(process.cwd() + '/test1', process.cwd() + '/test2');
  console.log(reslut);
  // console.log(reslut);
  // console.log(reslut);
})();
