import { RequestHandler } from 'express';
import { Product } from '../models/product';

export const getAddProduct: RequestHandler = (_, res) =>
	res.render('admin/edit-product', {
		path: '/admin/add-product',
		pageTitle: 'Add Product',
		editing: false,
	});

export const getProducts: RequestHandler = (_, res) =>
	Product.fetchAll((products) =>
		res.render('admin/products', {
			path: '/admin/products',
			pageTitle: 'My products',
			prods: products,
		}));

export const getEditProduct: RequestHandler = (req, res) => {
	const { edit } = req.query;
	!edit && res.redirect('/');

	const { productId } = req.params;
	Product.findById(productId, product =>
		!!product
			? res.render('admin/edit-product', {
				path: '/admin/products',
				pageTitle: 'Edit product',
				editing: !!edit,
				product,
			})
			: res.redirect('/')
	);
};

export const postUpdateProducts: RequestHandler = async (req, res) => {
	await Product.adapter(req.body).save();
	res.redirect('/admin/products');
};

export const postDeleteProduct: RequestHandler = async (req, res) => {
	await Product.deleteById(req.body.id);
	res.redirect('/admin/products');
};