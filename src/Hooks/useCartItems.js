import { useState } from 'react';
import db from '../firebaseDb';

const useCartItems = () => {
    const [cartItems, setCartItems] = useState({});
    const addCartItem = (product, size, user) => {
      const id = product.sku + size;
      if (cartItems[id]) {
        const oldCartItem = cartItems[id];
        const updatedCartItem = {...oldCartItem, quantity: oldCartItem.quantity + 1};
        setCartItems({...cartItems, [id]: updatedCartItem});
      }
      else {
        const newCartItem = { product, size, quantity: 1};
        setCartItems({... cartItems, [id]: newCartItem});
      }
      // setCartProducts(
      //   cartProducts.find(product => product.sku === p.sku) ?
      //     cartProducts.map(product =>
      //       product.sku === p.sku ?
      //         { ...product, quantity: product.quantity + 1 }
      //         :
      //         product
      //     )
      //     :
      //     [{ ...p, size, quantity: 1 }].concat(cartProducts)
      // );
    }
  
    const deleteCartItem = (cartItemId, user) => {
      const newCartItems =
              Object
                  .keys(cartItems)
                  .filter(id => id !== cartItemId)
                  .reduce((obj, id) => (
                      {
                          ...obj,
                          [id]: cartItems[id]
                      }
                  ), {});
      setCartItems(newCartItems);
  
      if (user) {
          db.ref('carts/' + user.uid).set(newCartItems);
      }
    }
    const updateShoppingCart = (newCartItems, user) => {
        setCartItems(newCartItems);

        if (user) {
            db.ref('carts/' + user.uid).set(newCartItems);
        }
    }

    return [cartItems, setCartItems, addCartItem, deleteCartItem, updateShoppingCart];

  
  };

export default useCartItems;