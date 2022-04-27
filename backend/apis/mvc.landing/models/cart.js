const fs = require("fs");
const path = require("path");

/**
 * productsPath = keeps the path to `data/products.json`
 */
const productsPath = path.join(__dirname, "..", "database", `cart.json`);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch previous cart
    fs.readFile(productsPath, function (err, fileContent) {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze the cart -> find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      // add new product or increase the quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = existingProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id: id,
          qty: 1,
        };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(productsPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(productsPath, function (err, fileContent) {
      if (err) return;
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.findIndex((prod) => prod.id === id);
      const productQty = product.qrt;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(productsPath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
  static getCart(cb) {
    fs.readFile(productsPath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        console.log(err);
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
