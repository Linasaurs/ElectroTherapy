import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";


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
        fetch('/api/Customer/signin', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: event.target.password.value,
                email: event.target.email.value
            })
        }).then(async response => {
            if (!response.ok) {
                alert(await response.text())
            } else {
                let token = await response.text()
                localStorage.setItem('Token', token)
                alert("Signed in successfully!")
                window.location.href="/"
            }

        })
        event.preventDefault();

    }


    render() {

        return (
            <div>
                <h1>Sign In</h1>
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