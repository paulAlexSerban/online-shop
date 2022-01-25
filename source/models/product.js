const fs = require("fs");
const path = require("path");

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
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    /* 1 */
    getProductsFromFile((products) => { /* 1.1 */
      products.push(this); /* 1.2 */
      fs.writeFile(productsPath, JSON.stringify(products), (err) => { /* 1.3 */
        console.log(err);
      });
    });
  }

  static fetchAll(callback) { /* 2 */
    getProductsFromFile(callback); /* 2.1 */
  }
};
