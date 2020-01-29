import React from 'react';
import "rbx/index.css";
import { Box, Media, Image, Content, Delete } from 'rbx';

const CartItem = ({ product, quantity, size, deleteCartItem }) => {
    const { title, description, price} = product
    return (
        <Box>
            <Media>
                <Media.Item as = "figure" align = "left">
                    <Image.Container as = "p" size = {64}>
                        <Image alt = "64x64" src = {`data/products/${product.sku}_1.jpg`}/>
                    </Image.Container>
                </Media.Item>
                <Media.Item align = "content">
                    <Content>
                        <p>
                            <strong> { title }</strong>
                            <br />
                            {description}
                            <br />
                            Quantity: {quantity}
                            <br />
                            Size: {size}
                            <br />
                            Price: {price}
                        </p>
                    </Content>
                </Media.Item>
                <Media.Item align = "right">
                    <Delete onClick={() => deleteCartItem(product.sku + size)} />
                </Media.Item>
            </Media>
        </Box>
    );
}

export default CartItem;