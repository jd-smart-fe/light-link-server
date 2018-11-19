
const ejs = require('ejs')
const nunjucks = require('nunjucks')
const mkdirp = require('mkdirp')
const fs = require('fs')
const { exec } = require('child_process');
const path = require('path')


// 执行控制台操作
// exec('npm install && npm run dev', {
//   cwd: path.join(__dirname, 'template')
// }, (error, stdout, stderr) => {
//   console.log('error-------------s-s')
//   if (error) {
//     console.log('(--------------------);')
//     console.error(error);
//     return;
//   }
//   console.log(stdout);
// });

const widgets = [
  {
    key: 1,
    name: '组件1'
  },
  {
    key: 2,
    name: '组件2'
  }
]

const data = {widgets, apiPath: '/api/todos'}

const options = {}


ejs.renderFile('templates/app.vue.ejs', data, options, function(err, str){
  console.log('str', str);
  const dirName = 'test/'
  mkdirp(dirName, function(error) {
    fs.writeFileSync(`${dirName}/app.vue`, str)
  })
})
