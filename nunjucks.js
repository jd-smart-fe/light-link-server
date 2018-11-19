const nunjucks = require('nunjucks');
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')

nunjucks.configure('templates', {
    autoescape: true,
});

const data = {
  key: '测试数据',
  productid: '',
  data: {
    panel: {
      name: '当前温度',
      value: '--',
      ability: [
        {
          describe: '当前模式',
          currentStatus: '制冷',
          status: ['制冷', '加热', '除湿']
        },
        {
          describe: '当前风速',
          currentStatus: '自动',
          status: ['自动', '手动', '定时']
        }
      ]
    },
    options: [
      {
        name: '开关',
        type: 'switch',
        status: ['on', 'off']
      },
      {
        name: '温度',
        type: 'temperature',
        value: 0,
        status: []
      },
      {
        name: '模式',
        type: 'pattern',
        status: ['空调已关闭', '空调已开启']
      },
      {
        name: '风速',
        type: 'speed',
        status: ['自动', '低风', '中风', '高风', '强力', '静音']
      },
      {
        name: '节能',
        type: 'energy',
        status: ['on', 'off'],
      },
      {
        name: '睡眠',
        type: 'sleep',
        status: ['on', 'off'],
      },
      {
        name: '显屏',
        type: 'screen',
        status: ['on', 'off'],
      },
    ]
  }
}

nunjucks.render('index.html', {data: data}, (err, res) => {
  console.log('err: ', err);
  console.log('res: ', res);
  const dirName = 'views/'
  mkdirp(dirName, function(error) {
    fs.writeFileSync(`${dirName}/app.vue`, res)
  })
});
