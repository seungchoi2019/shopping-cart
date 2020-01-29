import React from 'react';
import "rbx/index.css";
import { Button, Card, Title } from 'rbx';
import CartItem from './CartItem';

const renderCartItems = (cartItems, deleteCartItem) => (
    Object.keys (cartItems).map (id => {
        const { product, quantity, size} = cartItems[id];
        return (
            <CartItem
                key = {id}
                product = {product}
                size = {size}
                quantity = {quantity}
                deleteCartItem = {deleteCartItem} />
        );
    })
);

const subtotal = (cartItems) => (
    Object
        .keys(cartItems)
        .reduce((total, id) => total + cartItems[id].product.price, 0)

);

const Cart = ({ cartItems, deleteCartItem }) => {
    return (
        <Card>
            <Card.Header centered>
                <Title align="centered">Cart</Title>
            </Card.Header>
            <Card.Content>
                {renderCartItems(cartItems, deleteCartItem)}
                <p>Total: {subtotal(cartItems)}</p>
                <Button>Checkout</Button>
            </Card.Content>
        </Card>
    );
}

export default Cart;