import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Products } from './components/Products';
import { Counter } from './components/Counter';
import { AddProduct } from './components/AddProduct';
import { SignIn } from './components/SignIn';

import './custom.css'
import {SignUp} from "./components/SignUp";
import {AddDiscount} from "./components/AddDiscount";
import {Order} from "./components/Order";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/products' component={Products} />
        <Route path='/add-product' component={AddProduct} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/add-discount' component={AddDiscount} />
        <Route path='/order' component={Order} />
      </Layout>
    );
  }
}
