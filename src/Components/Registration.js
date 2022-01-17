import React, { useState ,useRef} from 'react'
import { Form,Button } from 'react-bootstrap'
import { regis } from '../Config/Myservice';
export default function Registration() {
   const [state, setState] = useState({ email: '', uname: '' });
    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
    }
    const uname=useRef('')
    const email=useRef('')
    const addUser = (event) => {

        event.preventDefault();
       let data={uname:uname.current.value,email:email.current.value}
       
        regis(data)
            .then(res => {
                if (res.data.err == 0) {
                    console.log(res.data)
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })

    }
    return (
        <div>

            {/* <form method="post" onSubmit={addUser}>
                <div className="form-control">
                   <label>Email</label>
                   <input type="email" name="email" onChange={handler} />
                </div>
                <div className="form-control">
                   <label>User name</label>
                   <input type="text" name="uname" onChange={handler} />
                </div>
                <input type="submit" value="submit"/>
            </form> */}
            <Form method="post" onSubmit={addUser}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="uname" onChange={handler} className="form-control" ref={uname}  size="20" />
                    {/* <span style={{ color: 'red' }}>{errors.err_fname}</span> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" onChange={handler} className="form-control" ref={email}  size="20" />
                    {/* <span style={{ color: 'red' }}>{errors.err_fname}</span> */}
                </Form.Group>
                <Button type="submit" >Submit</Button>
            </Form>
        </div>
    )
}
