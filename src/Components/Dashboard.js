import React, { useEffect, useState } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getposts,cartAdd } from '../Config/Myservice'

import jwt_decode from 'jwt-decode'
export default function Dashboard() {
    const [uid,setUid]=useState('')
    let [products, setProducts] = useState([]);
    let [email, setEmail] = useState('')
   
    useEffect(()=>{
        // if(sessionStorage.getItem('user') === undefined){
        //     navigate('/login')
        // }
        if(localStorage.getItem('_token')!=undefined){
            let token=localStorage.getItem('_token');
            let decode=jwt_decode(token);
            console.log(decode)
            setUid(decode.uid)
        setEmail(sessionStorage.getItem('user'));
        getposts()
        .then(res=>{
            console.log(res.data)
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                setProducts(res.data.pdata);
            }
        })
    }
    },[])
    const addCart = (item) =>{
        // window.location.reload();
        console.log(item)
        cartAdd(item, email)
        .then(res=>{
            alert(res.data.msg)
        })
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
                            {/* <Nav>
                                <Link to="/cart" style={{ textDecoration: "none", fontSize: "20px" }}>Menu</Link>
                                <Link to="/cart" style={{ textDecoration: "none", fontSize: "20px", marginLeft: "20px" }}>Cart</Link>
                                <Link to="/profile" style={{ textDecoration: "none", fontSize: "20px", marginLeft: "20px", marginRight: "20px" }}>Profile</Link>
                                <Button variant="outline-secondary" className="ml-2"><Link to="/login" style={{ textDecoration: "none" }}>Logout</Link></Button>
                            </Nav> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container>
            <Container align="center">
                <h2>Menu</h2>
                </Container><br/>
            <Row>
                {products.map(item=>
                <Col lg={4} key={item._id}>
            <Card className="m-3">
                <Card.Img variant="top" src={`/images/${item.image}`} width="300" height="250" />
                <Card.Body>
                    <Card.Title>{item.pname}</Card.Title>
                    <Card.Text>
                    Rs. {item.prize}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-between">
                    <Button variant="light" className="btn btn-outline-dark my-2 my-sm-0" onClick={()=>{addCart(item)}}>Add to cart</Button>
                    
                    </div>
                </Card.Body>
                </Card>
                </Col>
                )}
                </Row>
                </Container>



            </Container>
        </>
    )
}
