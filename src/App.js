import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ProductList from "./Components/Product/ProductList";
import { Container, Button } from 'rbx';
import Cart from './Components/Cart/Cart';
import Sidebar from 'react-sidebar';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAfMamQWDLN4-wYMDoBILFDQTRJBaBDOKQ",
  authDomain: "...",
  databaseURL: "https://shopping-cart-a5447.firebaseio.com",
  projectId: "shopping-cart-a5447",
  storageBucket: "....",
  messagingSenderId: "...",
  appId: "..."

};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const useCartProducts = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const addCartProduct = (p, size) => {
    setCartProducts(
      cartProducts.find(product => product.sku === p.sku) ?
        cartProducts.map(product =>
          product.sku === p.sku ?
            { ...product, quantity: product.quantity + 1 }
            :
            product
        )
        :
        [{ ...p, size, quantity: 1 }].concat(cartProducts)
    );
  }
  const deleteCartProduct = (p) => {
    setCartProducts(cartProducts.filter(product => product.sku !== p.sku))
  }
  return [cartProducts, addCartProduct, deleteCartProduct];
}

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [cartOpen, setCartOpen] = useState (false);
  const [cartProducts, addCartProduct, deleteCartProduct] = useCartProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    // <Container>
    //   <ProductList products = {products} />
    // </Container>
    <Sidebar
    sidebar={<Cart
      cartProducts={cartProducts}
      deleteCartProduct={deleteCartProduct} />}
    open={cartOpen}
    onSetOpen={setCartOpen}
    pullRight
  >
    <Container>
      <Button onClick={() => setCartOpen(true)}>
        Open cart
      </Button>
      <ProductList
        products={products}
        addCartProduct={addCartProduct} />
    </Container>
  </Sidebar>
  );
};

export default App;
