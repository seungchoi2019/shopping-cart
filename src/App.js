import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ProductList from "./Components/Product/ProductList";
import { Container } from 'rbx';
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

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <ProductList products = {products} />
    </Container>
  );
};

export default App;
