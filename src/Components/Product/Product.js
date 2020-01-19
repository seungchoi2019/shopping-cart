import React, {useState} from 'react';
import 'rbx/index.css';
import { Button, Card, Image, Title } from 'rbx';

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
const Product = ({ product, addCartProduct }) => {
        const img = 'data/products/${product.sku}_2.jpg';
        const [size, setSize] = useState("");

        return (
            <Card>
                <Card.Image>
                    <Image.Container>
                        <Image src = {img} />
                    </Image.Container>
                </Card.Image>
                <Card.Content>
                    <Title> {product.title} </Title>
                    <Title size = {4}> {product.description}</Title>
                    <Title size = {4}> {product.currencyFormat} {product.price}</Title>
                    <Button>XS</Button>
                    <Button>S</Button>
                    <Button>M</Button>
                    <Button>L</Button>
                    <Button>XL</Button>
                    <Button onClick={() => size ? addCartProduct (product, size): alert("Size not selected")}>
                        Add to Cart
                    </Button>
                </Card.Content>
            </Card>
        )
};

export default Product;