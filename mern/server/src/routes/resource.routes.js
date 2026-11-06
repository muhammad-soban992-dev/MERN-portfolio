const validate = require('../middleware/validate');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const { idParam, slugParam } = require('../validators');

const routerFactory = (controller, schema, { publicGetOne = false } = {}) => {
  const router = require('express').Router();
  router.get('/', controller.list);
  if (publicGetOne) router.get('/:slug', validate(slugParam, 'params'), controller.getOne);
  router.post('/', verifyToken, requireAdmin, validate(schema), controller.create);
  router.put('/:id', verifyToken, requireAdmin, validate(idParam, 'params'), validate(schema), controller.update);
  router.delete('/:id', verifyToken, requireAdmin, validate(idParam, 'params'), controller.remove);
  return router;
};
module.exports = routerFactory;
