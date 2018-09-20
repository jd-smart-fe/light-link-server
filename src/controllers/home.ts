import BaseController from './base';
import * as Koa from 'koa';

class HomeController extends BaseController {
  constructor() {
    super();
  }
  async index(ctx: Koa.Context, next) {
    await ctx.render('home/index');
  }
}

export default HomeController;
