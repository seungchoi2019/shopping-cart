import React from 'react';
import "rbx/index.css";
import { Box, Media, Image, Content, Level, Delete, Icon } from 'rbx';

const CartItem = ({ product, deleteCartProduct }) => {
    const img = 'data/products/${product.sku}_2.jpg';
    return (
        <Box>
            <Media>
                <Media.Item as = "figure" align = "left">
                    <Image.Container as = "p" size = {64}>
                        <Image alt = "64x64" src = {img}/>
                    </Image.Container>
                </Media.Item>
                <Media.Item align = "content">
                    <Content>
                        <p>
                            <strong> { product.title }</strong>
                            <br />
                            {product.description}
                            <br />
                            Quantity: {product.quantity}
                            <br />
                            Size: {product.size}
                            <br />
                            Price: {product.price}
                        </p>
                    </Content>
                </Media.Item>
                <Media.Item align = "right">
                    <Delete onClick={() => deleteCartProduct(product)} />
                </Media.Item>
            </Media>
        </Box>
    );
}

export default CartItem;