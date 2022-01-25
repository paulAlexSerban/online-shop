const e = require('express');
const Product = require('../models/product');

/**
 * - getAddProducts()
 * - renders the `add-product.ejs` template and passes to it the required properties as an object
 */
 exports.getAddProducts = (req, res, next) => {
  res.render('admin/add-product', {
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
  const title = req.body.title;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  const description = req.body.description;
  const product = new Product(title, imageURL, description, price); /* 1 */
  product.save(); /* 2 */
  res.redirect('/'); /* 3 */
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
}