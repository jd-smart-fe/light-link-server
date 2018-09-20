import * as Router from 'koa-router';
import HomeController from '../controllers/home';

const router = new Router();

const controller = new HomeController();

const index = controller.index.bind(controller);

router.get('/home', index);

export default router;
