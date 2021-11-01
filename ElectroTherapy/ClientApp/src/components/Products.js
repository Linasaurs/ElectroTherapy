import React, { Component } from 'react';
import Select from 'react-bootstrap/Form';
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {forEach} from "react-bootstrap/ElementChildren";
import jwt from "jwt-decode";

export class Products extends Component {
  static displayName = Products.name;

  constructor(props) {
    super(props);
    this.state = { productList: [], loading: true, filter: "" , pageIndex:0, hasPrev:false, hasNext:true};
  }

  componentDidMount() {
    this.populateProducts();
  }
  
   parseCat(category) {
      switch (category){
        case 0:
          return "TV";
          break;
        case 1:
          return "Laptop";
          break;
        case 2:
          return "Sound System";
          break;
      }
    }
    
   renderProductsTable(productList) {
      let token=  localStorage.getItem("Token");
      let renderDiscount = false;
      let renderOrder = false;
      if(token != null){
          const user = jwt(token);
          renderDiscount = user.role === "admin";
          renderOrder = user.role === "customer";
      }
          
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Desc</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(product =>
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{this.parseCat(product.category)}</td>
              <td>{product.desc}</td>
              <td style={{ display: renderDiscount ? "block" : "none" }}> <Button  type="submit" onClick={() => this.addDiscount(product.id)}>Add Discount</Button> </td>
              <td style={{ display: renderOrder ? "block" : "none" }}> <Button  type="submit" onClick={() => this.orderProduct(product)}>Order</Button> </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  GetFilteredProducts(){
    if(this.state.filter === "") return this.state.productList;
    else return this.state.productList.filter((product) => product.category === parseInt(this.state.filter));
  }
  
  handleFilterProducts(event){
    this.setState({ filter: event.target.value });
  }
  
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderProductsTable(this.GetPagedProducts());

    return (
      <div>
        <h1 id="tabelLabel" >Products</h1>
        <div>
          Filter by Category
          <FormControl as="select" onChange={(e) => this.handleFilterProducts(e)}>
          <option value="">View all</option>
          <option value="0">TV</option>
          <option value="1">Laptop</option>
          <option value="2">Sound System</option>
        </FormControl>
        </div>
        {contents}
          <Button  disabled={!this.state.hasNext} className="float-right" onClick={() => this.changeIndex(1)}>Next</Button>
          <Button disabled={!this.state.hasPrev} className="left" onClick={() => this.changeIndex(-1)}>Previous</Button>
      </div>
    );
  }

  async populateProducts() {
    const response = await fetch('/api/Product');
    const data = await response.json();
    this.setState({ productList: data, loading: false, hasNext:data.length>5});
  }

   addDiscount(id) {
    this.props.history.push("/add-discount",{ productId: id });
  }

   orderProduct(product) {
       this.props.history.push("/order",{ product: product });
  }

    changeIndex(inc) {
        let newIndex = this.state.pageIndex + inc
        let pageCount = Math.ceil(this.GetFilteredProducts().length/5)
        if (newIndex>=0 && newIndex<pageCount)
        {
            this.setState({pageIndex:newIndex, hasPrev:newIndex>0, hasNext:newIndex<pageCount-1})
        }
    }
    GetPagedProducts(){
      let prodList = this.GetFilteredProducts()
        return prodList.slice(this.state.pageIndex*5,this.state.pageIndex*5+5)
    }
}
