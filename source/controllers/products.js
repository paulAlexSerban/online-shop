const Product = require('../models/product');


/**
 * - getAddProducts()
 * - renders the `add-product.ejs` template and passes to it the required properties as an object
 */
exports.getAddProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

/**
 * postAddProduct()
 * - updates the database with the new added product and redirects to the root page to view al products
 * 
 * 1. create the new Product object
 * 2. save the new product in the database
 * 3. redirect to root page template 
 */

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title); /* 1 */
  product.save(); /* 2 */
  res.redirect('/'); /* 3 */
};

/**
 * getProducts()
 * - get all products from the database and render `shop.ejs` passing all the required properties
 */

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
}
