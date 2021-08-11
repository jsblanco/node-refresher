import { RequestHandler } from 'express';
import { Product } from '../models/product';


export const getIndex: RequestHandler = (_, res) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			path: '/',
			pageTitle: 'Shop',
			prods: products,
		});
	});
};

export const getAllProducts: RequestHandler = (_, res) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			path: '/products',
			pageTitle: 'Shop',
			prods: products,
		});
	});
};

export const getCart: RequestHandler = (_, res) => {
	res.render('shop/cart', {
		path: '/cart',
		pageTitle: 'Your cart',
	});
};

export const getCheckout: RequestHandler = (_, res) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	});
};