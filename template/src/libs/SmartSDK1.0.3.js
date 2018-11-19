/* eslint-disable */
class SmartSDK {
  static WAENMESSAGE = '请检查是否是native环境';
  // toast
  static toast(str) {
    window.JDSMART.app.toast({message: str}, null);
  }
  // 初始化设备数据
  static initDevice(suc) {
    try{
      window.JDSMART.io.initDeviceData((json) => {
        json = typeof json === 'string' ? JSON.parse(json) : json;
        suc(json);
      });
    } catch (e) {
      window.console.warn(this.WAENMESSAGE);
    }
  }
  // 设置在线与离线状态
  static isOnlines(type) {
    try {
       window.JDSMART.app.config({showOnline: type});
    } catch (e) {
      window.console.warn(this.WAENMESSAGE);
    }
  }
  // 判断两个对象是否相同 并返回是否渲染页面
  static diffForObject(oldObj, newObj) {
    if ((!oldObj) || (!newObj) ) {
      this.toast('参数不能为空');
      return [false, {}];
    }
    const flag = this.diffs(oldObj, newObj);
    return [!flag, newObj];
  }
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
  // 快照函数
  // 控制函数
  static controlDevice(params, success, faid) {
    const paraArr = [];
    for(const key in params) {
      paraArr.push({'stream_id':key, 'current_value': params[key]})
      console.log(params[key]);
    }
    if (paraArr.length === 0) {
      this.toast('控制参数不能为空');
      return ;
    }
    try {
      window.JDSMART.io.controlDevice({'command': paraArr},
        (json) => {
          success(json);
        },
        (err) => {
          faid(err);
          this.toast(err.errorInfo);
        });
    } catch (e) {
      console.warn(this.WAENMESSAGE);
    }
  }
  // 设备快照
  static getSnapshot(callback, faid) {
   try {
      window.JDSMART.io.getSnapshot(
       (data) => {
        data = typeof data === 'string' ? JSON.parse(data) : data;
         callback(data);
        },
        (err) => {
          faid(err);
          this.toast(err.errorInfo);
        });
    } catch (e) {
      console.warn(this.WAENMESSAGE);
    }
  }
}

export default SmartSDK;
