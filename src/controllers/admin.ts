import { RequestHandler } from 'express';
import { Product } from '../models/product';

export const getAddProduct: RequestHandler = (_, res) =>
	res.render('admin/add-product', {
		path: '/admin/add-product',
		pageTitle: 'Add Product',
	});

export const postAddProduct: RequestHandler = async (req, res) => {
	await Product.adapter(req.body).save();
	res.redirect('/');
};

export const getProducts: RequestHandler = (_, res) =>
	Product.fetchAll((products) => {
		res.render('admin/products', {
			path: '/admin/products',
			pageTitle: 'My products',
			prods: products,
		});
	});
