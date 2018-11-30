import BuildTemplatesBase, { BuildTemplateResult } from './Base';
import { exec, ChildProcess } from 'child_process';
import * as path from 'path';
import { ReplaceResult } from '../ReplaceTemplates/Base';

class Bulid extends BuildTemplatesBase{
  private readonly BASH = 'npm run build';
  private dest: string;
  constructor(dest: ReplaceResult) {
    super(dest);
    this.dest = dest.fileAddress;
  }
  async build(): Promise<BuildTemplateResult> {

    const res: BuildTemplateResult = {
      status: false,
    };
    const isBuild = await this.exec(this.BASH);
    if (!isBuild) {
      return res;
    }
    const timestamp = Date.now();
    // 压缩文件
    const isZip = await this.exec(`zip -r ${timestamp} ./`);
    if (!isZip) {
      return res;
    }
    // 移动文件
    const isMove = await this.exec(`mv ${timestamp}.zip ../../src/public/${timestamp}.zip`);
    if (!isMove) {
      return res;
    }
    res.download = `http://localhost:3001/${timestamp}.zip`;
    res.status = true;
    res.buildDirAddress = this.dest;
    return res;
  }
  async exec(bash): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const child =  exec(bash, {
        cwd: path.join(this.dest),
      // tslint:disable-next-line:align
      }, error => {
        if (error) {
          reject(false);
          return;
        }
        resolve(true);
      });
      this.addChild(child);
    });
  }
  private addChild(child: ChildProcess) {
    // 把子进程添加到全局对象中，实现每个用户只能同事打包一个产品，来控制服务器并发子程序问题。
  }
}
export default Bulid;
