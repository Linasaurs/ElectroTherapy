import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class AddDiscount extends Component {
    static displayName = AddDiscount.name;

    constructor(props) {
        super(props);
        this.state = {
            productId:this.props.location.state.productId,
            minCount:'1',
            percentage:''
        };
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        fetch('/api/Discount/',{
            method:'Post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                productId:event.target.productId.value,
                minCount:event.target.minCount.value,
                percentage:event.target.discount.value / 100.0
            })
        }).then(async response => {
            if (!response.ok) {
                alert("Error adding discount! Customers are sad :(")
            } else {
                alert("Discount added! Now ppl get to spend less money")
            }

        })
        event.preventDefault();
    }


    render() {

        return (
            <div>
                <h1>Add Discount</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group  className="mb-3" controlId="productId" >
                        <Form.Label>Product ID</Form.Label>
                        <Form.Control disabled defaultValue={this.state.productId} type="number" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="minCount" >
                        <Form.Label>Minmum Quantity</Form.Label>
                        <Form.Control type="number" min="1"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="discount" >
                        <Form.Label>Discount (%)</Form.Label>
                        <Form.Control type="number" min="1"  max="100" required/>
                    </Form.Group>
                    <Button type="submit" value="Submit"> Add Discount </Button>
                </form>
            </div>
        );
    }
}