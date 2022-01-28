const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

/**
 * productsPath = keeps the path to `data/products.json`
 */
const productsPath = path.join(
  path.dirname(require.main.filename),
  "data",
  `products.json`
);

/**
 * getProductsFromFile
 * @param { function } callback - function that gets the content of `products.json` as an argument and gets called
 *
 * 1. reads the file from `data/products.json` and returns the content
 * 2. if there is no content an empty array gets returned
 * 3. if content is found and retrieved, then the JSON content gets parsed and passed as argument to the callback function
 */
const getProductsFromFile = (callback) => {
  fs.readFile(productsPath, (err, fileContent) => {
    /* 1 */
    if (err) {
      callback([]); /* 2 */
    } else {
      callback(JSON.parse(fileContent)); /* 3 */
    }
  });
};

/**
 * 1 save()
 * 1.1 access the products data and passes it as array argument to anonymous function
 * 1.2 saves the new product by pushing it in the products array
 * 1.3 writes the new products data in the `products.json` file
 *
 * 2. fetchAll()
 * - static function that can be called without instantiating a new Product option
 *
 * 2.1 gets amd returns the content of the `products.json` file
 */

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() { /* 1 */

    getProductsFromFile((products) => { /* 1.1 */
      if(this.id) {
        // updated product
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProductsArray = [...products];
        updatedProductsArray[existingProductIndex] = this;
        fs.writeFile(productsPath, JSON.stringify(updatedProductsArray), (err) => { /* 1.3 */
          console.log(err);
        });
      } else {
        // add new product
        this.id = ((Math.random() * Math.random() * Date.now()).toFixed()).toString();
        products.push(this); /* 1.2 */
        fs.writeFile(productsPath, JSON.stringify(products), (err) => { /* 1.3 */
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts= products.filter(p => p.id !== id);
      fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
        if(!err) {
          Cart.deleteProduct(id, product.price);
        }
      })
    })
  }

  static fetchAll(callback) { /* 2 */
    getProductsFromFile(callback); /* 2.1 */
  }

  static findById(id, callback) {
    getProductsFromFile(products => { 
      const product = products.find(p => p.id === id);
      callback(product);
    })
  }
};
