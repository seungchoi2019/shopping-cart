import React from 'react';
import "rbx/index.css";
import { Column } from 'rbx';
import Product from "./Product";

const ProductList = ({ products, addCartProduct }) => (
    <Column.Group centered vcentered multiline>
        {products.map(product=>
            <Column key = {product.sku} size="one-quarter">
                <Product
                    product = {product}
                    addCartProduct = {addCartProduct} />
                {/* <Product key = {product.sku} product = {product} /> */}
            </Column>
        )}
    </Column.Group>
);

export default ProductList;