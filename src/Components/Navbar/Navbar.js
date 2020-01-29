import React from 'react';
import "rbx/index.css";
import { Button, Navbar } from 'rbx';
import UserAuthentication from './UserAuthentication';

const navbar = ({ user, cartOpen, setCartOpen }) => {
    return (
        <Navbar color = "primary" fixed = "top" transparent>
            <Navbar.Menu>
                <Navbar.Segment align = "end">
                    <Navbar.Item>
                        <UserAuthentication user = {user} />
                    </Navbar.Item>
                    <Navbar.Item>
                        <Button onClick = {() => setCartOpen (!cartOpen)}>
                            Cart
                        </Button>
                    </Navbar.Item>
                </Navbar.Segment>
            </Navbar.Menu>
        </Navbar>
    );
}

export default navbar;