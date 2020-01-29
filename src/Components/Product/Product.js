import React, {useState} from 'react';
import 'rbx/index.css';
import { Button, Card, Image, Title } from 'rbx';
import SizeButton from '../SizeButton/SizeButton';

    // <Card>
    //     <Card.Image>
    //         <Image.Container size = "3by5">
    //             <Image src = { `data/products/${product.sku}_1.jpg`}/>
    //         </Image.Container>
    //     </Card.Image>
    //     <Card.Content>
    //         <Title>{product.title}</Title>
    //         <Title size = {4}> {product.description} </Title>
    //         <Title size = {4}> {product.currencyFormat} {product.price} </Title>
    //         <Button>XS</Button>
    //         <Button>S</Button>
    //         <Button>M</Button>
    //         <Button>L</Button>
    //         <Button>XL</Button>
    //         <Button style={{marginLeft: 50}}>Add to Cart</Button>
    //     </Card.Content>
    // </Card>


const inCart = (product, size, cart) => {
    const id = product.sku + size;
    return (cart[id] ? cart[id].quantity: 0);
};

const getInven = (productInventory, cart, product) => (
    Object
        .keys(productInventory)
        .reduce((stock, size) => (
            {
                ...stock,
                [size]: productInventory[size] - inCart (product, size, cart)
            }
        ), {})
);


const Product = ({ product, productInventory, cart, setCartOpen, addCartItem, user }) => {
        const [chosenSize, setChosenSize] = useState("");

        const renderOutOfStock = () => {
            const stock = getInven (productInventory, cart, product);
            if (Object.values(stock).every(numSizeAvailable => numSizeAvailable === 0)) {
                return <Title>Sorry, we are out of stock</Title>
            }
            return null;
        }

        const renderSizeButton = (size) => {
            const stock = getInven (productInventory, cart, product);
            if (stock[size] > 0) {
                return (
                    <Button
                        color = {chosenSize === size ? "primary" : null}
                        onClick = {() => setChosenSize (size)}>
                        {size}
                    </Button>
                );
            }
            return null;
        };

        const addToCart = (product, size, user) => {
            addCartItem(product, size, user);
            setChosenSize("");
            setCartOpen(true);
        }

        return (
            <Card>
                <Card.Image>
                    <Image.Container>
                        <Image src = {`data/products/${product.sku}_1.jpg`} />
                    </Image.Container>
                </Card.Image>
                <Card.Content>
                    <Title> {product.title} </Title>
                    <Title size = {4}> {product.description}</Title>
                    <Title size = {4}> {product.currencyFormat} {product.price}</Title>
                    {renderSizeButton("S")}
                    {renderSizeButton("M")}
                    {renderSizeButton("L")}
                    {renderSizeButton("XL")}
                    {renderOutOfStock()}
                    <br />
                    <Button onClick={() => chosenSize ? addToCart (product, chosenSize, user) : alert ("Please choose a size")}>
                        Add to Cart
                    </Button>
                </Card.Content>
            </Card>
        );
};

export default Product;