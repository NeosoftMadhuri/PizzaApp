import React,{useState,useRef,useEffect} from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import { register} from '../Config/Myservice'
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const User=axios.create({baseURL:"http://localhost:3001/User"})
const regForName=RegExp(/[A-Za-z ]+/)
export default function Signup() {
    const [errors, setError] = useState({ err_fname:'',err_lname:'', err_s_address:'',err_mobile:'',err_email: '', err_pass: '' ,err_cpass:''})
    const fname=useRef();
    const lname=useRef();
    const saddress=useRef();
    const mobile=useRef();
    const password=useRef();
    const cpassword=useRef();
    const email=useRef();
    const history=useHistory();
    const  handler=(event)=>{
        const name=event.target.name;
        switch(name){
            case 'fname':
               const e_fname=regForName.test(fname.current.value)?'':'Name should be  3 char long';
               setError({err_fname:e_fname})
                break;
            case 'email':
               const e_email=regForEmail.test(email.current.value)?'':'Email is not valid';
               setError({err_email:e_email})
                break;
            case 'lname':
               const e_lname=lname.current.value.length<3?'Name should be  3 char long':'';
               setError({err_lname:e_lname})
                break;
            case 'password':
               const e_pass=password.current.value.length<8?'Password must be 8 chanrater long':'';
               setError({err_pass:e_pass})
                break;
            case 'cpassword':
               const e_cpass=(password.current.value !== cpassword.current.value)?'Password  not match':'';
               setError({err_cpass:e_cpass})
                break;  
            case 'mobile':
                const e_mobile=mobile.current.value.length<10?'Mobile number should be 10 digit long':'';  
                setError({err_mobile:e_mobile})     
                break;
            case 'saddress':
                const e_sadd=saddress.current.value.length<6?'uname should be 8 digit long':'';  
                setError({err_s_address:e_sadd})
                break;
                break;
        }
    }
    const addUser = (event) => {

        event.preventDefault();
       let data={fname:fname.current.value,lname:lname.current.value,email:email.current.value,password:password.current.value,mobile:mobile.current.value,saddress:saddress.current.value}
       
       register(data)
            .then(res => {
                if (res.data.err == 0) {
                    console.log(res.data)
                    history.push('/login')
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })

    }
  
    return (
        <>
             <Container>
                <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
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
                            {/* <Nav>
                                <Button variant="outline-secondary" className="mr-2"><Link to="/register" style={{ textDecoration: "none" }}>Sign up</Link></Button>
                                <Button variant="outline-secondary" className="ml-2"><Link to="/login" style={{ textDecoration: "none" }}>Login</Link></Button>
                            </Nav> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Row>
                    <Col sm={6} md={6} lg={6} xs={6}>
                        <img src="../Images/pizza_login.jpg" style={{ width: "100%", height: "550px" }} />
                    </Col>
                    <Col sm={6} md={6} lg={6} xs={6} >
                        <Row style={{ textAlign: "center", marginTop: "30px" }}>
                            <h3>Pizza House</h3>
                            <h4 className="my-3 mb-5">Register Here....</h4>
                        </Row>
                        <Row>
                        <Form method="post" onSubmit={addUser}>
                        
                        <Row>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>First Name</Form.Label>
                                     <Form.Control type="text" name="fname" onChange={handler} className="form-control" ref={fname} size="20" />
                                 <span style={{color:'red'}}>{errors.err_fname}</span>
                               </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Last Name</Form.Label>
                                     <Form.Control  type="text" name="lname" onChange={handler} ref={lname} className="form-control" size="20" />
                                     <span style={{color:'red'}}>{errors.err_lname}</span>
                               </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Email id</Form.Label>
                                     <Form.Control type="text" name="email" onChange={handler}  ref={email}className="form-control" size="20"/>
                                     <span style={{color:'red'}}>{errors.err_email
                                     
                                     }</span>
                               </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Mobile</Form.Label>
                                     <Form.Control  type="number" name="mobile" onChange={handler} ref={mobile} className="form-control" size="20" />
                                     <span style={{color:'red'}}>{errors.err_mobile}</span>
                               </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Password</Form.Label>
                                     <Form.Control type="password" name="password" onChange={handler} ref={password} className="form-control" size="20"/>
                                     <span style={{color:'red'}}>{errors.err_pass}</span>
                               </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Confirm Password</Form.Label>
                                     <Form.Control  type="password" name="cpassword" ref={cpassword} onChange={handler} className="form-control" size="20"/>
                                     <span style={{color:'red'}}>{errors.err_cpass}</span>
                               </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12} md={12} lg={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Street Address</Form.Label>
                                     <Form.Control type="text" name="email" onChange={handler}  ref={saddress}className="form-control" size="20"/>
                                     <span style={{color:'red'}}>{errors.err_s_address
                                     
                                     }</span>
                               </Form.Group>
                             </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={6} lg={6}>
                                <div style={{textAlign:"center"}}>
                                <Button type="submit" className="btn btn-primary mb-3">Submit</Button>
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div style={{textAlign:"center"}}>
                            <Button className="btn btn-secondary" type="submit">
                              <Link to="/login" style={{color:"white",textDecoration:"none"}}>Back</Link>
                             </Button>
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
