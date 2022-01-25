const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/add-product', adminController.getAddProducts); // /admin/add-product => GET
router.get('/products', adminController.getProducts); // /admin/products => GET

router.post('/add-product', adminController.postAddProduct); // /admin/add-product => POST

exports.routes = router;
