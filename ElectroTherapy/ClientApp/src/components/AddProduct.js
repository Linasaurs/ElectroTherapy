import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class AddProduct extends Component {
    static displayName = AddProduct.name;

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            price:0.0,
            type:-1,
            
        };
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        fetch('/api/Product',{
            method:'Post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:event.target.pformName.value,
                desc:event.target.pformDesc.value,
                price:parseFloat(event.target.pformPrice.value),
                Category:parseInt(event.target.pformType.value),
            })
        }).then(response => {
            if (!response.ok) {
                alert ("Error adding product")}
                else{
                    alert("Product added successfully"); 
                }
                
        })

        event.preventDefault();
    }
    

    render() {

        return (
            <div>
                <h1>Add Product</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="pformName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="pformDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" style={{ height: '100px' }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="pformPrice" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" min="0" required/>
                        <Form.Text>EGP</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="pformType">
                        <Form.Label>Product Category</Form.Label><br/>
                        <Form.Control as="select" required>
                            <option value="">Select Product Type</option>
                            <option value="0">TV</option>
                            <option value="1">Laptop</option>
                            <option value="2">Sound System</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" value="Submit"> Sumbit </Button>
                </form>
            </div>
        );
    }
}