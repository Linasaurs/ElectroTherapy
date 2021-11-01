import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class SignIn extends Component {
    static displayName = SignIn.name;

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            email:''
        };
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        fetch('/api/Customer/signin',{
            method:'Post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password:event.target.password.value,
                email:event.target.email.value
            })
        }).then(async response => {
            if (!response.ok) {
                alert("User not found")
            } else {
                alert("Sign in yoooo!!!")
                localStorage.setItem('Token', await response.text())
            }

        })
        event.preventDefault();
    }


    render() {

        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="email" >
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" min="0" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required/>
                    </Form.Group>
                    <Button type="submit" value="Submit"> Sign in </Button>
                </form>
            </div>
        );
    }
}