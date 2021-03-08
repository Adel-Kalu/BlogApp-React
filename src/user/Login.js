import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Login extends Component {
    state = {}

    loginHandler = () => {
        this.props.login(this.state);
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
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>


                    <Button variant="primary" block onClick={this.loginHandler}>Login</Button>
                </Container>
                
            </div>
        )
    }
}
