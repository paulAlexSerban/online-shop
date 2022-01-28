const e = require('express');
const Product = require('../models/product');

/**
 * - getAddProducts()
 * - renders the `add-product.ejs` template and passes to it the required properties as an object
 */
 exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
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
  const product = new Product(null, title, imageURL, description, price); /* 1 */
  product.save(); /* 2 */
  res.redirect('/'); /* 3 */
};

exports.getEditProduct = (req, res, next) => {
  /**
   * NOTE 
   * - the parameter from the URL query is passed as a String so, `=== "true"` is needed
   *  */ 

  const editMode = req.query.edit === "true";
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageURL = req.body.imageURL;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageURL, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}