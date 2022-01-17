import React from 'react'
import { Navbar, Nav, Container, Row, Col,Image,Button } from 'react-bootstrap'
import {BrowserRouter as Router,Link} from 'react-router-dom'
export default function index() {
    return (
        <>
            <Container>
                <Navbar collapseOnSelect bg="light" expand="lg" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">
                        <Image src="Images/logo.jpg" width="110px" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features"></Nav.Link>
                                <Nav.Link href="#pricing"></Nav.Link>
                               
                            </Nav>
                            <Nav>
                                <Button variant="outline-secondary" className="mr-2"><Link to="/register" style={{textDecoration:"none",color:"black"}}>Sign up</Link></Button>
                                <Button variant="outline-secondary"className="ml-2"><Link to="/login" style={{textDecoration:"none",color:"black"}}>Login</Link></Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container className="mt-5 p-4" style={{backgroundColor:"lightgrey"}} >
                    <Row>
                        <h1 style={{fontSize:"55px"}}>Pizza Delivery</h1>
                        <p className="mt-3" style={{fontSize:"20px"}}>
                            Welcome to pizza delivery service.This is the place when you may choose the most delicious pizza you like from wide variety of options.
                            </p>
                            <hr/>
                            <p className="mt-3" style={{fontSize:"20px"}}>
                               We're performing delivery free of charge in case if your order is higher than 20$.
                            </p>
                            <Row className="mb-5">
                                <Button className="btn btn-secondary"><Link to="/login" style={{textDecoration:"none",color:"black"}}>Sign In and Order</Link></Button>
                            </Row>
                    </Row>
                </Container>
            </Container>


        </>
    )
}
