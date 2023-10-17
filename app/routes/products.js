let express = require('express');
let router = express.Router();

let userController = require('../controllers/products');


router.get('/products', userController.list);
router.post('/products', userController.create);
router.get('/products/:id', userController.userByID, userController.read);
router.put('/products/:id', userController.update);
router.delete('/products/:id', userController.remove);

module.exports = router;
