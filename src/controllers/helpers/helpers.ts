import { Cart, ProductsInCart } from '../../models/cart';
import { Product } from '../../models/product';

export const getCartProductsData = (cb: (e: ProductsInCart) => any) =>
    Cart.getCart(cart =>
        Product.fetchAll(productArr => {
            const populatedCart: ProductsInCart = [];
            productArr.map(product => {
                const cartProductData = cart?.products
                    .find(prod => prod.id === product.id);
                cartProductData && populatedCart.push({
                    productData: product,
                    qty: cartProductData.qty
                });
            });
            return cb(populatedCart);
        }));