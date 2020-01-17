import React from 'react';
import "rbx/index.css";
import { Column } from 'rbx';
import Product from "./Product";

const ProductList = ({ products }) => (
    <Column.Group centered vcentered multiline>
        {products.map(product=>
            <Column size="one-quarter">
                <Product key = {product.sku} product = {product} />
            </Column>)}
    </Column.Group>
);

export default ProductList;