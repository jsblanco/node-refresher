import path from 'path';
import fs from 'fs';
import { Product } from './product';
import { stringify } from 'querystring';

const p = path.join(
    __dirname,
    '..',
    'data',
    'cart.json'
);


export class Cart {
    static addProduct(id: string, price = 0) {
        fs.readFile(p, (err, fileContent) => {
            const cart: CartData = err
                ? { products: [], totalPrice: 0 }
                : JSON.parse(fileContent.toString());

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);

            existingProductIndex > -1
                ? cart.products[existingProductIndex] = {
                    ...cart.products[existingProductIndex],
                    qty: cart.products[existingProductIndex].qty + 1
                }
                : cart.products = [...cart.products, { id, qty: 1 }];

            cart.totalPrice += price;

            fs.writeFile(p, JSON.stringify(cart), console.log)
        });
    }
}

type CartData = {
    products: ProductCartEntry[];
    totalPrice: number;
};

type ProductCartEntry = {
    id: string;
    qty: number;
};