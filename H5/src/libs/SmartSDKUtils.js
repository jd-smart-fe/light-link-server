/**
 * @name SmartSDK
 * @description  对jdsmart-1.0.3.js中的常用方法进行二次封装，可自行根据业务扩展
 * @author  shilili1
 */

class SmartSDK {

  /**
   * @name ready
   * @description 桥已经准备好了
   */
  static ready() {
    return new Promise((resolve, reject) => {
      window.JDSMART.ready(() => {
        console.log('=====');
        resolve();
      });
    })
  }

  /**
   * @name titleBar
   * @description 修改头部的文案，对应configActionBar，详细可以查看【设备控制和APP接口】-【配置ActionBar】
   * @param displayL 左边的展示内容
   * @param displayR 右边的展示内容
   *        - 支持的几种常用的图片：
   *        - drawable_back
   *        - drawable_setting
   *        - drawable_more
   *        - drawable_add
   *        - drawable_close
   * @param funL 左边回调函数名称
   * @param funR 右边回调函数名称
   * @param title 头部的title
   */
  static titleBar(displayL, displayR, funL, funR, title) {
    const what = ['button1', 'button4'];
    const display = [displayL, displayR];
    const callBackName = [funL, funR];

    const param = {
      what,
      display,
      callBackName,
    };

    window.JDSMART.util.configActionBar(param);
    if (title && title !== '' && title !== null) {
      window.JDSMART.app.config({
        titletext: title,
      });
    }
  }

  /**
   * @name closeWindow
   * @description 关闭当前本地页面，返回业务页面
   */
  static closeWindow() {
    window.JDSMART.util.closeWindow();
  }

  /**
   * @name toast
   * @description toast 提示
   * @param {String} str
   */
  // toast
  static toast(str) {
    window.JDSMART.app.toast({
      message: str
    }, null);
  }

  /**
   * @name initDevice
   * @description 初始化设备数据
   */
  static initDevice() {
    return new Promise((resolve, reject) => {
      window.JDSMART.io.initDeviceData((json) => {
        const res = typeof json === 'string' ? JSON.parse(json) : json;
        resolve(json);
      })
    })
  }

  /**
   * @name getSnapshot
   * @description 获取设备快照
   */
  static getSnapshot() {
    return new Promise((resolve, reject) => {
      window.JDSMART.io.getSnapshot(
        (json) => {
          const data = typeof json === 'string' ? JSON.parse(json) : json;
          resolve(data);
        },
        (err) => {
          reject(err);
          this.toast(err.errorInfo);
        }
      )
    })
  }

  /**
   * @name setOnlineStatus
   * @description 设置设备在线和离线的状态
   * @param {Boolean} status true: 在线，false: 离线
   */
  static setOnlineStatus(status) {
    window.JDSMART.app.config({
      showOnline: status,
    })
  }

  /**
   * @name controlDevice
   * @description 控制设备的状态
   * @param {Object} params
   */
  // 控制函数
  static controlDevice(params) {
    const paramArr = [];
    Object.keys(params).forEach((key) => {
      paramArr.push({
        'stream_id': key,
        'current_value': params[key],
      })
    });

    if (paramArr.length === 0) {
      this.toast('控制参数不能为空');
      return;
    }

    return new Promise((resolve, reject) => {
      window.JDSMART.io.controlDevice({
          'command': paramArr,
        },
        (json) => {
          const res = typeof json ? JSON.parse(json) : json;
          resolve(res);
        },
        (err) => {
          reject(err);
          this.toast(err.errorInfo);
        }
      )
    })
  }
   /**
   * @name diffForObject
   * @description  判断两个对象是否相同 并返回是否渲染页面
   * @param {Object} oldObj
   * @param {Object} newObj
   */
   static diffForObject(oldObj, newObj) {
    if ((!oldObj) || (!newObj) ) {
      this.toast('参数不能为空');
      return [false, {}];
    }
    const flag = this.diffs(oldObj, newObj);
    return [!flag, newObj];
  }
   /**
   * @name diffs
   * @description  判断两个对象是否相同 并返回是否渲染页面
   * @param {Object} object1
   * @param {Object} object2
   */
  // 判断对象是否相等函数
  static diffs(object1, object2) {
    for (const propName in object1) {
        if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof object1[propName] != typeof object2[propName]) {
            return false;
        }
    }
    for(const propName in object2) {
        if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof object1[propName] != typeof object2[propName]) {
            return false;
        }
        if(!object1.hasOwnProperty(propName))
          continue;
        if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
           if (!object1[propName].equals(object2[propName]))
                        return false;
        }
        else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
           if (!object1[propName].equals(object2[propName]))
                        return false;
        }
        else if(object1[propName] != object2[propName]) {
           return false;
        }
    }
    return true;
   }
}

export default SmartSDK;
