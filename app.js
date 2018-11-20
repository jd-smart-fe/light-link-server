const nunjucks = require('nunjucks');
const mkdirp = require('mkdirp')
const fs = require('fs')
const { exec } = require('child_process');
const path = require('path')

nunjucks.configure('templates', {
    autoescape: true,
    tags: {
      variableStart: '[[',
      variableEnd: ']]'
    }
});

const data = {
  curtemp: '当前温度------',
  key: '测试数据',
  productId: '',
  data: {
    options: [
      {
        type: 'panel',
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
      {
        type: 'switch',
        name: '开关',
        status: ['on', 'off']
      },
      {
        type: 'temperature',
        name: '温度',
        value: 0,
        status: []
      },
      {
        type: 'pattern',
        name: '模式',
        status: ['空调已关闭', '空调已开启']
      },
      {
        type: 'speed',
        name: '风速',
        status: ['自动', '低风', '中风', '高风', '强力', '静音']
      },
      {
        type: 'energy',
        name: '节能',
        status: ['on', 'off'],
      },
      {
        type: 'sleep',
        name: '睡眠',
        status: ['on', 'off'],
      },
      {
        type: 'screen',
        name: '显屏',
        status: ['on', 'off'],
      },
    ]
  }
}


// 渲染模版
nunjucks.render('index.html', {data: data}, (err, res) => {
  console.log('err: ', err);
  console.log('res: ', res);
  const dirName = 'template/src/'
  let baseDir = __dirname;
  let opts = {
    cwd: baseDir,
    encoding: 'utf8',
    stdio: [process.stdin, process.stdout, process.stderr]
  }
  mkdirp(dirName, (error) => {
    fs.writeFileSync(`${dirName}/app.vue`, res, opts)
  })
});


// 执行控制台操作
function startupProject() {
  exec('npm run dev', {
    cwd: path.join(__dirname, 'template')
  }, (error, stdout, stderr) => {
    console.log('error-------------s-s')
    if (error) {
      console.log('(--------------------);')
      console.error(error);
      return;
    }
    console.log(stdout);
  });
}
