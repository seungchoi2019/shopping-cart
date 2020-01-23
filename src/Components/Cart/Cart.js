import React from 'react';
import "rbx/index.css";
import { Card, Title, Button } from 'rbx';
import CartItem from './CartItem';

const Cart = ({ cartItems, deleteCartProduct }) => {
    return (
        <Card>
            <Card.Header centered>
                <Title align = "centered">Cart</Title>
            </Card.Header>
            <Card.Content>
                {cartItems.map(product =>
                    <CartItem 
                    key = {product.sku}
                    product = {product}
                    deleteCartProduct = {deleteCartProduct} />
                )}
                <p>Subtotal: {cartItems.reduce((total, p) => total + p.price, 0)}</p>
                <Button>Checkout</Button>
            </Card.Content>
        </Card>
    );
}

export default Cart;