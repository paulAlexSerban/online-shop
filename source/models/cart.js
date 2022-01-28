const fs = require("fs");
const path = require("path");

/**
 * productsPath = keeps the path to `data/products.json`
 */
 const productsPath = path.join(
  path.dirname(require.main.filename),
  "data",
  `cart.json`
);


module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch previous cart
    fs.readFile(productsPath, function (err, fileContent) {
      let cart = {
        products: [],
        totalPrice: 0,
      }
      if(!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze the cart -> find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      // add new product or increase the quantity
      let updatedProduct;
      if(existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty = existingProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = {
          id: id,
          qty: 1
        }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(productsPath, JSON.stringify(cart), err => {
        console.log(err);
      })
    })
  }
}