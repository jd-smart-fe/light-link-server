import BuildTemplatesBase, { BuildTemplateResult } from './Base';
import { exec, ChildProcess } from 'child_process';
import * as path from 'path';

class Bulid extends BuildTemplatesBase{
  private readonly BASH = 'npm run build';
  private dest: string;
  constructor(dest) {
    super(dest);
    this.dest = dest;
  }
  async build(): Promise<BuildTemplateResult> {

    const res: BuildTemplateResult = {
      status: false,
    };
    const b = await this.exec();
    if (!b) {
      return res;
    }
    res.status = true;
    res.buildDirAddress = this.dest;
    return res;
  }
  async exec(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const child =  exec(this.BASH, {
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
