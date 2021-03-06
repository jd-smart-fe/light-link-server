import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Log4js from 'log4js';
import * as serve from 'koa-static';
import * as KoaViews from 'koa-views';
import router from './routes';
import cors from './middlewares/cors';

const logger = Log4js.getLogger('app');
logger.level = 'info';

const app = new Koa();

app.use(cors());
app.use(BodyParser({
  enableTypes: ['json', 'form', 'text'],
}));

app.use(serve('./static'));

// 测试使用，后期优化。
app.use(serve('./src/public'));

app.use(
  KoaViews(`${__dirname}/views`, {
    map: {
      html: 'nunjucks',
    },
  }),
);

app.use(router.routes());

const port = 3001;

app.listen(port, () => {
  logger.info(
    '[worker:%s] web server start listen on %s.\naddress: %s',
    process.pid,
    port,
    `http://localhost:${port}`,
  );
});
