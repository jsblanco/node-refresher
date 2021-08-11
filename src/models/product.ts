import path from 'path';
import fs from 'fs';

const p = path.join(
  __dirname,
  '..',
  'data',
  'products.json'
);
console.log(p)

const getProductsFromFile = (cb: any) => {
  fs.readFile(p, (err, fileContent) => err
    ? cb([])
    : cb(JSON.parse(fileContent.toString()))
  );
};

export class Product {
  constructor(
    public title: string,
  ) {
  }

  save() {
    getProductsFromFile((products: Product[]) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => console.log);
    });
  }

  static fetchAll(cb: (e: any) => void) {
    getProductsFromFile(cb);
  }
};
