import path from 'path';
import fs from 'fs';
import { Cart } from './cart';

const p = path.join(
  __dirname,
  '..',
  'data',
  'products.json'
);

const getProductsFromFile = (cb: (e: Product[]) => any) => fs
  .readFile(p, (err, fileContent) => err
    ? cb([])
    : cb(JSON.parse(fileContent.toString()))
  );

export class Product {

  constructor(
    public id: string | null,
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number,
  ) {
  }

  save() {
    getProductsFromFile((products: Product[]) => {
      const updatedProducts = [...products];
      const productIndex = this.id
        ? products.findIndex(p => p.id === this.id)
        : -1;
      productIndex > -1
        ? updatedProducts[productIndex] = this
        : updatedProducts.push({ ...this, id: new Date().toString() });
      fs.writeFile(p, JSON.stringify(updatedProducts), err => console.log);
    });
  }

  static deleteById(id: string) {
    getProductsFromFile(productArr => {
      const updatedProducts = productArr.filter(product => product.id !== id);
      const deletedProduct = productArr.find(product => product.id === id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err =>
        (!err && deletedProduct) && Cart.deleteProduct(id, +deletedProduct?.price)
      );
    });
  }

  static fetchAll(cb: (e: Product[]) => any) {
    getProductsFromFile(cb);
  }

  static findById(id: string, cb: (e?: Product) => any) {
    getProductsFromFile(productArr =>
      cb(productArr.find(product => product.id === id))
    );
  }

  static adapter = (item: ProductCandidate) => new Product(
    item.id,
    item.title,
    item.imageUrl,
    item.description,
    +item.price,
  );
};

interface ProductCandidate {
  id: string | null,
  title: string,
  imageUrl: string,
  description: string,
  price: string | number,
}