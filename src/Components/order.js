import React from 'react'
import Navs from './Navs'
import {Container,Alert,Button} from 'react-bootstrap'

export default function order() {
    return (
        <>
        <Navs/>
            <Container>
            <h1>Order has been placed Successfully</h1><br/>
            <Alert varaint="info">You will  receive notification to email with order details</Alert><br/>
            <Button variant="light" className="btn btn-outline-dark my-2 my-sm-0" href="/dashboard">Go an order some other </Button>
        </Container>
        </>
    )
}
