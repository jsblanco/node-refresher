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
    private static updateCart(cart: CartData) {
        fs.writeFile(p, JSON.stringify(cart), console.log);
    }

    static addProduct(id: string, price: number) {
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

            this.updateCart(cart);
        });
    }

    static deleteProduct(id: string, productPrice: number) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return;

            const cart: CartData = JSON.parse(fileContent.toString());
            const product = cart.products.find(prod => prod.id === id);
            if (!product) return;

            cart.totalPrice -= (productPrice * product.qty);
            cart.products = cart.products.filter(prod => prod.id !== id);
            this.updateCart(cart);
        });
    }

    static getCart(cb: (e?: CartData) => any) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent.toString());
            cb(err ? null : cart);
        });
    }
}

export type ProductsInCart = {
    productData: Product,
    qty: number;
}[];

type CartData = {
    products: ProductCartEntry[];
    totalPrice: number;
};

type ProductCartEntry = {
    id: string;
    qty: number;
};