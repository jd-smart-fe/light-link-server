import ReplaceTemplatesBase, { ReplaceResult } from './Base';
import * as path from 'path';
import * as nunjucks from 'nunjucks';
import * as mkdirp from 'mkdirp';
import Utils from '../../utils/utils';
import * as fsExtra from 'fs-extra';

class Replace extends ReplaceTemplatesBase {
  constructor(config) {
    super(config);
  }
  async replaceTemplates() {
    const replaceResult: ReplaceResult = {
      status: false,
    };
    const uuid = Utils.uuid();
    const dest = await this.copyTemplate(uuid);
    const result = await this.render(dest);
    await this.replaceFile(dest, result);
    replaceResult.status = true;
    replaceResult.fileAddress = dest;
    // await this.build(dest);
    return replaceResult;
  }
  async copyTemplate(uuid: string): Promise<string> {
    const cwd = process.cwd();
    const source = path.join(cwd, 'templates', this.config.templateName);
    const dest = path.join(cwd, 'temp', uuid);
    await this.cpDir(source, dest);
    return dest;
  }

  async render(dest) {
    const src = path.join(`${dest}`, 'template.html');
    nunjucks.configure(src, {
      autoescape: true,
      tags: {
        variableStart: '[[',
        variableEnd: ']]',
      },
    });
    return new Promise((resolve, reject) => {
      nunjucks.render(src, { H5Data: this.config }, (err, res) => {
        if (err) {
          console.log(err);
          reject();
          return;
        }
        resolve(res);
      });
    });
  }
  async checkDir(dirName): Promise<boolean> {
    // console.log('err: ', err);
    return new Promise<boolean>((resolve, reject) => {
      mkdirp(dirName, err => {
        if (err) {
          reject(false);
          return;
        }
        resolve(true);
      });
    });
  }
  async replaceFile(baseDir, result) {
    const opts = {
      cwd: baseDir,
      encoding: 'utf8',
      stdio: [process.stdin, process.stdout, process.stderr],
    };
    const dest = path.join(`${baseDir}`, 'src', 'App.vue');
    fsExtra.writeFile(dest, result, opts);
  }
  async cpDir(from, to) {
    const list = await fsExtra.readdir(from);
    for (let i = 0; i < list.length; i += 1) {
      const src = path.join(from, list[i]);
      const dest = path.join(to, list[i]);
      const stat = await fsExtra.stat(src);
      if (stat && stat.isDirectory()) {
        await this.cpDir(src, dest);
      } else {
        await fsExtra.copy(src, dest);
      }
    }
  }
}
export default Replace;
