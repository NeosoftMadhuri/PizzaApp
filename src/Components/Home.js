import React, { useEffect, useState } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getposts, cartAdd ,getOrder} from '../Config/Myservice'
import Navs from './Navs'
import jwt_decode from 'jwt-decode'
export default function Home() {
    const [ueid, setUeid] = useState('')
    const [post, setPost] = useState([])
    const myCart = useSelector((state) => state.cart)
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory();


    useEffect(() => {

        if (sessionStorage.getItem('user') === undefined) {
            history.push('/login')
        }
        console.log(sessionStorage.getItem('user'))
        
        getOrder(sessionStorage.getItem('user'))
        .then(res=>{
            if(res.data.orders){
               
                setCount(res.data.orders.length)
            }
        })
        if (localStorage.getItem('_token')) {
            let token = localStorage.getItem('_token')
            let decode = jwt_decode(token);
            console.log(decode)
            setUeid(decode.uid)
            console.log(decode.uid)
            getposts()
                .then(res => {
                    console.log(res.data.pdata)
                    if (res.data.err == 0) {
                        setPost(res.data.pdata)
                    }

                })

        }
    }, [])

    const addCart = (pro) => {
        window.location.reload();   
        console.log(ueid)
        cartAdd(pro,ueid)
            .then(res => {
                console.log(res.data)
                alert(res.data.msg)
            })
    }

    return (
        <>
            <Container fluid>
                <Navs/>
                {/* <Navbar collapseOnSelect bg="light" expand="lg" variant="light">
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
                                <Link to="/cart" style={{ textDecoration: "none", fontSize: "20px" }}>Menu</Link>
                                <Link to="/shoppingcart" style={{ textDecoration: "none", fontSize: "20px", marginLeft: "20px" }}>Cart{count}</Link>
                                <Link to="/profile" style={{ textDecoration: "none", fontSize: "20px", marginLeft: "20px", marginRight: "20px" }}>Profile</Link>
                                <Button variant="outline-secondary" className="ml-2"><Link to="/login" style={{ textDecoration: "none" }}>Logout</Link></Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}

                <Container>

                    <Row className="mt-3">

                        {post.map((pro) =>

                            <Col md={4} sm={4} lg={4} sx={4} style={{ marginBottom: "40px" }}>
                                <Card className="card-box" style={{ width: '20rem', textAlign: "center" }} >
                                    <Card.Img className="card-img" variant="top" src={`Images/${pro.image}`} style={{ height: "150px", width: "250px", marginLeft: "50px" }} />

                                    <Card.Body className="bg-light">
                                        <Card.Title>{pro.pname}</Card.Title>
                                        <Card.Text>

                                            <h6>  Price:{pro.prize}$</h6>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary" onClick={(event) => addCart(pro)}    >Add to Cart</Button>
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
