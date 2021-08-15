import { RequestHandler } from 'express';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { getCartProductsData } from './helpers/helpers';


export const getIndex: RequestHandler = (_, res) =>
	Product.fetchAll((products) =>
		res.render('shop/index', {
			path: '/',
			pageTitle: 'Shop',
			prods: products,
		}));

export const getAllProducts: RequestHandler = (_, res) =>
	Product.fetchAll((products) =>
		res.render('shop/product-list', {
			path: '/products',
			pageTitle: 'Shop',
			prods: products,
		}));

export const getCart: RequestHandler = (_, res) =>
	getCartProductsData(products => res
		.render('shop/cart', {
			path: '/cart',
			pageTitle: 'Your cart',
			products,
		}));

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

export const getProductDetails: RequestHandler = (req, res) =>
	Product.findById(req.params.productId, product =>
		res.render('shop/product-detail', {
			path: '/products',
			pageTitle: `${product?.title} details`,
			product: product,
		}));

export const postCartAddProduct: RequestHandler = (req, res) => {
	const { productId } = req.body;
	Product.findById(productId, (product) =>
		product && Cart.addProduct(productId, product.price));
	res.redirect('/cart');
};

export const postCartRemoveProduct: RequestHandler = (req, res) => {
	const { productId } = req.body;
	Product.findById(productId, (product) =>
		product && Cart.deleteProduct(productId, product.price));
	res.redirect('/cart');
};