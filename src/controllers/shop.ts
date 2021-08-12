import { RequestHandler } from 'express';
import { Cart } from '../models/cart';
import { Product } from '../models/product';


export const getIndex: RequestHandler = (_, res) =>
	Product.fetchAll((products) => {
		res.render('shop/index', {
			path: '/',
			pageTitle: 'Shop',
			prods: products,
		});
	});

export const getAllProducts: RequestHandler = (_, res) =>
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			path: '/products',
			pageTitle: 'Shop',
			prods: products,
		});
	});

export const getCart: RequestHandler = (_, res) =>
	res.render('shop/cart', {
		path: '/cart',
		pageTitle: 'Your cart',
	});

export const postCart: RequestHandler = (req, res) => {
	const { productId } = req.body;
	Product.findById(productId, (product)=> {
		Cart.addProduct(productId, product?.price)
	});
	res.redirect('/cart');
};


export const getOrders: RequestHandler = (_, res) =>
	res.render('shop/orders', {
		path: '/orders',
		pageTitle: 'Your orders',
	});

export const getCheckout: RequestHandler = (_, res) =>
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	});

export const getProductDetails: RequestHandler = (req, res) => {
	const { productId } = req.params;
	Product.findById(productId, product =>
		res.render('shop/product-detail', {
			path: '/products',
			pageTitle: `${product?.title} details`,
			product: product,
		})
	);
};