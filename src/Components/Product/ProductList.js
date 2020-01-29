import React from 'react';
import "rbx/index.css";
import { Column } from 'rbx';
import Product from "./Product";

const ProductList = ({ products, inventory, cart, setCartOpen, addCartItem, user }) => (
    <Column.Group centered vcentered multiline>
        {products.map(product=>
            <Column key = {product.sku} size="one-quarter">
                <Product
                    product = {product}
                    addCartItem = {addCartItem}
                    productInventory = {inventory[product.sku]}
                    cart = {cart}
                    setCartOpen = {setCartOpen}
                    user = {user} />
            </Column>
        )}
    </Column.Group>
);

export default ProductList;