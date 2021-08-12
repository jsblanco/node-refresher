import path from 'path';
import fs from 'fs';

const p = path.join(
  __dirname,
  '..',
  'data',
  'products.json'
);

const getProductsFromFile = (cb: (e: Product[]) => any) => {
  fs.readFile(p, (err, fileContent) => err
    ? cb([])
    : cb(JSON.parse(fileContent.toString()))
  );
};

export class Product {

  id: string;
  constructor(
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number,
  ) {
    this.id = new Date().toString();
  }

  save() {
    getProductsFromFile((products: Product[]) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => console.log);
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
    item.title,
    item.imageUrl,
    item.description,
    +item.price,
  );
};

interface ProductCandidate {
  title: string,
  imageUrl: string,
  description: string,
  price: string | number,
}