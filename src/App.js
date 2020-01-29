import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ProductList from "./Components/Product/ProductList";
import { Container, Button } from 'rbx';
import Cart from './Components/Cart/Cart';
import Sidebar from 'react-sidebar';
import Navbar from './Components/Navbar/Navbar';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAfMamQWDLN4-wYMDoBILFDQTRJBaBDOKQ",
  authDomain: "https://shopping-cart-a5447.firebaseapp.com",
  databaseURL: "https://shopping-cart-a5447.firebaseio.com",
  projectId: "shopping-cart-a5447",
  storageBucket: "shopping-cart-a5447.appspot.com",
  messagingSenderId: "...",
  appId: "..."

};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const useCartItems = () => {
  const [cartItems, setCartItems] = useState({});
  const addCartItem = (product, size) => {
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

  const deleteCartItem = (cartItemId) => {
    setCartItems (
      Object
        .keys(cartItems)
        .filter(id => id !== cartItemId)
        .reduce ((obj, id) =>(
          {
            ...obj,
            [id]: cartItems[id]
          }
        ), {}));
  }
  return [cartItems, addCartItem, deleteCartItem];
}

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [cartOpen, setCartOpen] = useState (false);
  const [cartItems, addCartItem, deleteCartItem] = useCartItems();
  const [user, setUser] = useState(null);
  const [inventory, setInventory] = useState({});
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
      setProductsLoaded(true);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setInventory(snap.val())
        setInventoryLoaded(true);
      };
    }
    db.on('value', handleData, error => alert (error));
    return () => { db.off ('value', handleData);};
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    // <Container>
    //   <ProductList products = {products} />
    // </Container>
    productsLoaded && inventoryLoaded ?
    <Sidebar
      sidebar = {
        <Cart
          cartItems = {cartItems}
          deleteCartItem = {deleteCartItem} 
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
      />
    </Sidebar>
    :
    <h1> Loading </h1>
  );
};

export default App;
