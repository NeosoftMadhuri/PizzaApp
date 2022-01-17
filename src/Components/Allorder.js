import React, { useState, useEffect } from 'react'
import Navs from './Navs'
import { getAllorder } from '../Config/Myservice'
import { Table, Container } from 'react-bootstrap'
export default function Allorder() {
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        getAllorder(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.orders) {
                    setOrder(res.data.orders)
                    console.log(res.data.orders)
                }
            })

    }, [])
    return (
        <>
            <Navs />
            <Container>
                <h3>All Order</h3>
            </Container>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((pro, index) => 
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pro.pname}</td>
                            <td>{pro.price}</td>
                            <td>{pro.quantity}</td>
                            <td>{pro.checkout? 'Delivered' : 'Yet to be delivered'}</td>
                        </tr>

                    )}
                </tbody>
            </Table>

        </>
    )
}
