import React, { useState, useEffect,useRef } from 'react'
import { Container, Navbar, Nav, Button, Table ,Row,Col,Form} from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import Navs from './Navs'
import { deleteOrder, getOrder,finalCheckOut } from '../Config/Myservice'
export default function ShippingCart() {
    let [orders, setOrders] = useState([]);
    let [total, setTotal] = useState(0);
    let [flag, setFlag] = useState(false)
    let ccna=useRef('')
    const history = useHistory()
    useEffect(() => {
        getOrder(sessionStorage.getItem('user'))
            .then(res => {
                if (!res.data.msg) {
                    setOrders(res.data.orders)
                    const ttl = res.data.orders.reduce((prev, cur) => prev + (cur.price * cur.quantity), 0)
                    setTotal(ttl)
                }
            })
    }, []);
    const deleteord = (id) => {
        console.log("delete ")
        deleteOrder(id)
            .then(res => {
                alert(res.data.msg)
                window.location.reload()
                history.push("/shoppingcart");
            })
    }

    const checkedOut = () => {
        setFlag(true)
    }

    const finalCheckout=()=>{
       finalCheckOut(sessionStorage.getItem('user'))
       .then(res=>{
           alert(res.data.msg)
           history.push("/order")
       })
    }
    return (
        <>
            <Navs />
            <Container className="mt-3">
                <Container align="center">
                    <h2>Shopping Cart</h2>
                </Container><br />
                {orders.length !== 0 ?
                    <Table class="table table-dark" striped bordered hover size="sm" >

                        <tbody>
                            {orders.map(item =>
                                <tr key={item._id}>
                                    <td scope="col">{item.pname}</td>
                                    <td scope="col">{item.price}</td>
                                    <td scope="col">{item.quantity}</td>
                                    <td scope="col"><Button type="submit" variant="danger" onClick={() => deleteord(item._id)}>Delete</Button></td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan="3">Rs. {total}</td>
                                <td ><Button onClick={checkedOut}>Check out</Button></td>
                                {/* <td><Button href="/checkout" variant="light" >Check out</Button></td> */}
                            </tr>
                        </tbody>
                    </Table> : <h3 className="mt-5 bg-secondary p-2">Your cart is empty</h3>}

                {flag ?
                    <Form>
                        <Form.Group className="mb-3" as={Row} >
                            <Form.Label column sm={2}><b>Credit Card Number : </b></Form.Label>
                            <Col sm={7}>
                                <Form.Control type="number" placeholder="Enter credit card number" name="cnumber" ref={ccna} />
                                {ccna != '' && ccna.length < 16 && <span className="text-danger">Enter creidt card number correctly</span>}</Col>
                            <h4 className="mt-4">
                                Order total: $. {total}
                            </h4>
                        </Form.Group>
                        <Button variant="light" className="btn btn-outline-dark my-2 my-sm-0" onClick={() => finalCheckout()}>
                            Check out
                        </Button>
                    </Form>
                    : ''}
            </Container>
        </>
    )
}
