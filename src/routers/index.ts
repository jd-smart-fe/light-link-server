import * as Router from 'koa-router';
import homeRouter from './home';

const router = new Router();

router.redirect('/', '/home');

router.use(homeRouter.routes(), homeRouter.allowedMethods());

export default router;
