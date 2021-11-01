import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class Order extends Component {
    static displayName = Order.name;

    constructor(props) {
        super(props);
        this.state = {
            product:this.props.location.state.product,
            count:0,
            totalPrice:0
            
        };
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        console.log("sup  I reached here")
        let url='/api/Order/' + this.state.product.id + "/" + this.state.count
        console.log(url)
        fetch( url ,{
            method:'Post'
        }).then(async response => {
            if (!response.ok) {
                alert("Error adding order! Customers are sad :(")
            } else {
                alert("Order added!")
            }
        })

        this.props.history.push('/products')
    }


    render() {

        return (
            <div>
                <h1>Check Out</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group  className="mb-3" controlId="productName" >
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control disabled defaultValue={this.state.product.name} type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="minCount" >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control defaultValue={this.state.count} onChange={(e) => {this.calculatePrice(e)}} type="number" min="1"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="discount" >
                        <Form.Label>Total Amount</Form.Label>
                        <Form.Control value={this.state.totalPrice}  type="text" disabled/>
                    </Form.Group>
                    <Button type="submit" value="Submit">Order</Button>
                </form>
            </div>
        );
    }

    calculatePrice(e) {
    if (!e.target.value){
    this.setState({count:0, totalPrice:0})
        }
    else {
        let count= e.target.value;
        fetch('/api/Order/getTotalPrice/' + this.state.product.id + "/" + e.target.value, {
            method: 'Get'
        }).then(async response => {
            if (!response.ok) {
                alert("How many of that stuff to you really need??")
                this.setState({totalPrice:0})
            } else {
                let totalPrice= await response.text()
                this.setState({count:count, totalPrice:totalPrice})
            }
            

        })
    }
    }
}