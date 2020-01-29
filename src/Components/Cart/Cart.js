import React, {useEffect} from 'react';
import "rbx/index.css";
import { Button, Card, Title } from 'rbx';
import CartItem from './CartItem';
import db from '../../firebaseDb';

const renderCartItems = (cartItems, deleteCartItem, user) => (
    Object.keys (cartItems).map (id => {
        const { product, quantity, size} = cartItems[id];
        return (
            <CartItem
                key = {id}
                product = {product}
                size = {size}
                quantity = {quantity}
                deleteCartItem = {deleteCartItem}
                user = {user} />
        );
    })
);

const subtotal = (cartItems) => {
    return (
        Object
            .keys(cartItems)
            .reduce((total, id) => total + cartItems[id].product.price, 0)
    )
};

const checkoutHandler = (cartItems) => {
    const inventoryRef = db.ref('inventory/')
    inventoryRef.transaction(inventory => {
        if (inventory) {
            Object.values(cartItems)
                .forEach(cp => {
                    const { product, size, quantity } = cp;
                    inventory[product.sku][size] -= quantity;
                })
        }
        return inventory;
    });
    alert("Checked out successfully")
}

const exceedInventoryHandler = (cartItems, inventory, updateShoppingCart, user) => {
    let userMessage = "";
    let exceeds = false;

    const newCartItems =
        Object
            .keys(cartItems)
            .reduce((newCart, id) => {
                const { product, size, quantity } = cartItems[id];
                const available = inventory[product.sku][size];
                if (available < quantity) {
                    exceeds = true;
                    if (inventory[product.sku][size] === 0) {
                        userMessage = userMessage + `${product.title} of size ${size} is out of stock. Removed from shopping cart\n`;
                        return newCart
                    } else {
                        userMessage = userMessage + `Due to inventory change, reduced quantity of ${product.title} of size ${size} from ${quantity} to ${available}\n`;
                        return {
                            ...newCart,
                            [id]: {
                                ...cartItems[id],
                                quantity: available
                            }
                        }

                    }
                }
                else {
                    return { ...newCart, [id]: cartItems[id] }
                }
            }, {})

    if (exceeds) {
        alert(userMessage);
        updateShoppingCart(newCartItems, user);
    }
}


const Cart = ({ cartItems, deleteCartItem, user, inventory, updateShoppingCart }) => {
    useEffect(() => {
        exceedInventoryHandler(cartItems, inventory, updateShoppingCart, user);
    }, [inventory, cartItems, updateShoppingCart, user]);

    return (
        <Card>
            <Card.Header centered>
                <Title align="centered">Cart</Title>
            </Card.Header>
            <Card.Content>
                {renderCartItems(cartItems, deleteCartItem, user)}
                <p>Total: {subtotal(cartItems)}</p>
                <Button onClick={() => checkoutHandler(cartItems)}>
                    Checkout
                </Button>
            </Card.Content>
        </Card>
    );
}

export default Cart;