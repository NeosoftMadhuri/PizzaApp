import React,{useState,useEffect} from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import { getposts, cartAdd ,getOrder} from '../Config/Myservice'
export default function Navs() {
   const history=useHistory();  
    const [count, setCount] = useState(0)
    useEffect(()=>{
        getOrder(sessionStorage.getItem('user'))
        .then(res=>{
            if(res.data.orders){
                setCount(res.data.orders.length)
            }
        })
    })

    const logout=()=>{
        sessionStorage.clear();
        localStorage.clear();
        history.push('/');
    }
    return (
        <>
            <Container fluid>
            <Navbar collapseOnSelect bg="light" expand="lg" variant="light">
                    <Container fluid>
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
                                <Link to="/home" style={{ textDecoration: "none", fontSize: "20px" }}>Menu</Link>
                                <Link to="/shoppingcart" style={{ textDecoration: "none", fontSize: "20px", marginLeft: "20px" }}>Cart{count}</Link>
                                <Link to="/allorder" style={{ textDecoration: "none", fontSize: "20px", marginLeft: "20px", marginRight: "20px" }}>All Orders</Link>
                                <Link to="/profile" style={{ textDecoration: "none", fontSize: "20px", marginLeft: "1px", marginRight: "20px" }}>Profile</Link>
                                <Button variant="outline-secondary" onClick={()=>logout()} className="ml-2">Logout</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


            </Container>
           
            
        </>
    )
}
