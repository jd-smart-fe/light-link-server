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
    const body: any = ctx.request.body;
    const data = JSON.parse(body.H5Data);
    console.log(data);
    const b = await this.service.publish(data);
    ctx.body = b;
  }
  async save(ctx: Koa.Context, next) {
  }
}

export default HomeController;
