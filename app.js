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

const H5Data = {
  curtemp: '当前温度------',
  key: '测试数据',
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
        1: '设备已开启'
      }
    },
    counter: {
      type: 'Counter',
      is_show: false,
      title: '温度设置',
    },
    modes: {
      type: 'Modes',
      is_show: true,
      title: '模式设置0000',
      modeData: JSON.stringify(
        [
          {
            id: 0,
            text: '自动0',
            icon:'icon-mode-automatic',
          },{
            id: 1,
            text: '制冷1',
            icon:'icon-mode-freeze',
          },{
            id: 2,
            text: '制热2',
            icon:'icon-mode-holiday',
          },{
            id: 3,
            text: '除湿',
            icon:'icon-mode-dry',
          },{
            id: 4,
            text: '送风',
            icon:'icon-range-large',
          },{
            id: 5,
            text: '智能',
            icon:'icon-mode-smart',
          },{
            id: 6,
            text: '通风',
            icon:'icon-mode-cool',
          }
        ]
      )
    },
    windRang: {
      type: 'WindRang',
      is_show: true,
      title: '风速调节123',
      windRangValues: JSON.stringify(
        [
          {
            value: 0,
            text: '自动'
          },{
            value: 1,
            text: '微风'
          },{
            value: 2,
            text: '低风'
          },{
            value: 3,
            text: '中风'
          },{
            value: 4,
            text: '高风'
          },{
            value: 5,
            text: '静音'
          },{
            value: 6,
            text: '自然'
          }
        ]
      )
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
  }
}


// 渲染模版
nunjucks.render('index.html', {H5Data: H5Data}, (err, res) => {
  console.log('err: ', err);
  console.log('res: ', res);
  const dirName = 'H5/src/'
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
