import React, { useState,useRef,useEffect} from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import {login} from '../Config/Myservice'
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const User=axios.create({baseURL:"http://localhost:3001/User"})
export default function Login() {
    const [errors, setError] = useState({ err_email: '', err_pass: '' })
  
    const email = useRef('')
    const password = useRef('')
    const history=useHistory();
    //load data from server
   

  //validation
    const handler = (event) => {
        const name = event.target.name;

        switch (name) {
            case 'email':
                const e_email = regForEmail.test(email.current.value) ? '' : 'Email-id is not valid';
                setError({ err_email: e_email })
                break;
            case 'password':
                const e_pass = password.current.value.length < 8 ? 'Password should be 8 char long' : '';
                setError({ err_pass: e_pass })
            default:
                break;
        }
    }

    //Check Login Credentials
    const addUser = (event)  => {
        event.preventDefault();
          let data={email:email.current.value,password:password.current.value}

         login(data).
         then(res=>{
            if(res.data.err==0){
                console.log(res.data)
                localStorage.setItem("_token",res.data.token);
                sessionStorage.setItem("user",email.current.value)
                history.push('/home')
             }
             if(res.data.err==1){
                 console.log(res.data)
             }
         })
    }

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
                                <Button variant="outline-secondary" className="mr-2"><Link to="/register" style={{ textDecoration: "none" }}>Sign up</Link></Button>
                                {/* <Button variant="outline-secondary" className="ml-2"><Link to="/login" style={{ textDecoration: "none" }}>Login</Link></Button> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Row>
                    <Col sm={6} md={6} lg={6} xs={6}>
                        <img src="../Images/pizza_login.jpg" style={{ width: "100%", height: "430px" }} />
                    </Col>
                    <Col sm={6} md={6} lg={6} xs={6} >
                        <Row style={{ textAlign: "center", marginTop: "30px" }}>
                            <h3>Pizza House</h3>
                            <h4 className="my-3 mb-5">Login to countinue....</h4>
                        </Row>
                        <Row>
                            <Form style={{ height: "300px" }} method="post" onSubmit={addUser}>

                                <hr style={{ border: "1px solid red" }} />
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address*</Form.Label>
                                    <Form.Control type="text" name="email" id="email" ref={email} onChange={handler} placeholder="Enter email id" size="md" />
                                    <span style={{ color: 'red' }}>{errors.err_email}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password*</Form.Label>
                                    <Form.Control type="password" name="password" id="pass" onChange={handler} ref={password} placeholder="Enter password" />
                                    <span style={{ color: 'red' }}>{errors.err_pass}</span>
                                </Form.Group>
                                <Row>
                                    <Col sm={6} md={6} lg={6}>
                                        <div style={{ textAlign: "center" }}>
                                            <Button className="btn btn-primary" type="submit">
                                                Submit
                                            </Button>
                                        </div>

                                    </Col>
                                    <Col sm={6} md={6} lg={6}>
                                        <div style={{ textAlign: "center" }}>
                                        <Button variant="btn btn-secondary" ><Link to="/" style={{ textDecoration: "none",color:"white" }}>Back</Link></Button>
                                            
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Row>

                    </Col>
                </Row>


            </Container>
        </>
    )
}
