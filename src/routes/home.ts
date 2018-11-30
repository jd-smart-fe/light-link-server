import * as Router from 'koa-router';
import HomeController from '../controllers/home';

const router = new Router();

const controller = new HomeController();

const index = controller.index.bind(controller);
const publish = controller.publish.bind(controller);

router.get('/home', index);

router.post('/home/publish', publish);

export default router;
