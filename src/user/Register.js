import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Register extends Component {
    state = {}

    registerHandler = () => {
        this.props.register(this.state);
    }


changeHandler = (e) => {
    let temp = {... this.state}
    temp[e.target.name] = e.target.value;
    this.setState(temp)
    console.log(temp);
} 

    render() {
        return (
            <div>
                <Container>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>User Role</Form.Label>
                        <Form.Control as="select" name="userRole" onChange={this.changeHandler}>

                            <option value="">Select Role</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_USER">User</option>

                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" block onClick={this.registerHandler}>Register</Button>
                </Container>
                
            </div>
        )
    }
}
