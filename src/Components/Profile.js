import React, { useEffect,useState } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import { getProfile } from '../Config/Myservice'
import Navs from './Navs'
export default function Profile() {
   // const [user, setUser] = useState([]);
    let [user, setUser] = useState([]);
    
    useEffect(()=>{
        getProfile(sessionStorage.getItem('user'))
        .then(res=>{
            setUser(res.data.user)
            console.log(res.data.user)
            console.log(user)
            // if(res.data.user){
            //     console.log(res.data.user);
            //     setUser(res.data.user);
            //     console.log(user)
            // }
        })
    },[])
    // useEffect(()=>{
    //     getProfile(sessionStorage.getItem('user'))
    //     .then(res=>{
    //         if(res.data.user){
    //             console.log(res.data.user);
    //             setUser("xyz");
                
    //         }
    //     })
    // },[])
    
    return (
        <>
           <Navs/>

           <Container style={{textAlign:"center"}}>
               <h2 >Profile Details</h2>
            <div style={{textAlign:"center"}}>
               {user.map((pro)=>
                    <Card style={{width:"400px"}} className="m-5">
                    <Card.Body>
                        <Card.Title><h6>Name: {pro.fname} {pro.lname}</h6></Card.Title>
                        <Card.Subtitle><h6>Email: {pro.email}</h6></Card.Subtitle>
                        <h6>Mobile No.: {pro.mobile}</h6>
                        <h6>Address: {pro.saddress} </h6>
                    </Card.Body>
                    <Card.Text>
                        
                    </Card.Text>
                </Card>
            
               )}
                 </div>
              
           </Container>
        </>
    )
}
