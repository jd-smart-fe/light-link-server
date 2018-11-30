import BaseController from './base';
import * as Koa from 'koa';
import HomeSevice from '../services/home';

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

    const { status, download } = await this.service.publish(data.H5Data);
    ctx.body = {
      status,
      download,
    };
  }
  async save(ctx: Koa.Context, next) {
  }
}

export default HomeController;
