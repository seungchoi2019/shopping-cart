import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ProductList from "./Components/Product/ProductList";
import { Container, Button } from 'rbx';
import Cart from './Components/Cart/Cart';
import useCartItems from './Hooks/useCartItems';
import Sidebar from 'react-sidebar';
import Navbar from './Components/Navbar/Navbar';
import firebase from 'firebase/app';
import db from './firebaseDb';
import 'firebase/auth';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [cartOpen, setCartOpen] = useState (false);
  const [cartItems, setCartItems, addCartItem, deleteCartItem, updateShoppingCart] = useCartItems();
  const [user, setUser] = useState(null);
  const [inventory, setInventory] = useState({});
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setData (snap.val());
        setItemsLoaded(true);
      };
    }
    const itemsRef = db.ref('products/');
    itemsRef.once('value')
      .then(handleData, error => alert(error));
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setInventory(snap.val());
        setInventoryLoaded(true);
      };
    }
    const inventoryRef = db.ref('inventory/');
    inventoryRef.on('value', handleData, error => alert(error));
    return () => { inventoryRef.off('value', handleData); };
    // db.on('value', handleData, error => alert (error));
    // return () => { db.off ('value', handleData);};
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    const getUserShoppingCart = user => {
      const handleData = snap => {
        if (snap.val()) {
          setCartItems(snap.val());
        }
      }
      const userShoppingCartRef = db.ref('carts/' + user.uid);
      userShoppingCartRef.once('value')
        .then(handleData, error => alert(error));
    }
    user ? getUserShoppingCart(user) : setCartItems({});
  }, [user, setCartItems]);


  return (
    // <Container>
    //   <ProductList products = {products} />
    // </Container>
    itemsLoaded && inventoryLoaded ?
    <Sidebar
      sidebar = {
        <Cart
          cartItems = {cartItems}
          deleteCartItem = {deleteCartItem}
          inventory = {inventory}
          updateShoppingCart = {updateShoppingCart}
          user = {user} 
        />}
        open = {cartOpen}
        onSetOpen = {setCartOpen}
        pullRight>
      <Navbar user = {user} cartOpen = {cartOpen} setCartOpen={setCartOpen} />
      <ProductList
        products = {products}
        inventory = {inventory}
        cart = {cartItems}
        addCartItem = {addCartItem}
        setCartOpen = {setCartOpen}
        user = {user}
      />
    </Sidebar>
    :
    <h1> Loading </h1>
  );
};

export default App;
