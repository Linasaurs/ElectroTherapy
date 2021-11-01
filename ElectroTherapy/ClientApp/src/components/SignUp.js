import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class SignUp extends Component {
    static displayName = SignUp.name;

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            email:''
        };
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        fetch('/api/Customer/signup',{
            method:'Post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:event.target.username.value,
                password:event.target.password.value,
                email:event.target.email.value
            })
        }).then(response => {
            if (!response.ok) {
                alert ("Error! Could not register user.")}
            else{
                alert("Registered successfully fi a7la tech store fyky ya masr");
            }

        })

        event.preventDefault();
    }


    render() {

        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email" >
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" min="0" required/>
                    </Form.Group>
                    <Button type="submit" value="Submit"> Register </Button>
                </form>
            </div>
        );
    }
}