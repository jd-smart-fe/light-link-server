import BaseController from './base';
import * as Koa from 'koa';
import HomeSevice from '../services/home';

const H5Data = {
  productId: '1',
  templateName: 'air-condictioning',
  data: {
    header: {
      type: 'Header',
      is_show: false,
      des_curtemp: '当前温度',
      des_pattern: '当前模式',
      des_speed: '当前风速',
    },
    power: {
      type: 'Power',
      is_show: false,
      title: '设备状态',
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
      is_show: false,
      title: '模式设置',
      modeData: JSON.stringify([
        {
          id: 0,
          text: '自动',
          icon: 'icon-mode-automatic',
        },
        {
          id: 1,
          text: '制冷',
          icon: 'icon-mode-freeze',
        },
        {
          id: 2,
          text: '制热',
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
      title: '风速调节',
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
      is_show: false,
      title: '屏显',
    },
    mute: {
      type: 'Mute',
      is_show: false,
      title: '静音',
    },
    sleep: {
      type: 'Sleep',
      is_show: false,
      title: '睡眠',
    },
  },
};

class HomeController extends BaseController {
  private service: HomeSevice = null;
  constructor() {
    super();
    this.service = new HomeSevice();
  }
  async index(ctx: Koa.Context, next) {
    await ctx.render('home/index');
  }
  async publish(ctx: Koa.Context, next) {
    const data: any = ctx.request.body;

    data.H5Data.data.modes = H5Data.data.modes;
    data.H5Data.data.windRang = H5Data.data.windRang;

    const newData: any = Object.assign({}, H5Data, data);

    const { status, download } = await this.service.publish(newData.H5Data);
    ctx.body = {
      status,
      download,
    };
  }
  async save(ctx: Koa.Context, next) {
  }
}

export default HomeController;
