import React from 'react'
import Navbar from './Navbar'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import CustomerComponent from './components/CustomerComponent'
import OrderComponent from './components/OrderComponent'
import ProductComponent from './components/ProductComponent'
import AddCustomerComponent from './components/AddCustomerComponent';
import LoginComponent from './components/authentication/LoginComponent';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import configureAxiosInterceptors from './components/authentication/AxiosConfig'

function App() {
  configureAxiosInterceptors()

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={LoginComponent} />
        <Route path="/login" exact component={LoginComponent} />
        <AuthenticatedRoute path="/customers/" component={CustomerComponent} />
        <AuthenticatedRoute path="/orders/" component={OrderComponent} />
        <AuthenticatedRoute path="/products/" component={ProductComponent} />
        <AuthenticatedRoute path="/add-edit-customer/:id?" component={AddCustomerComponent} />
      </div>
    </Router>
  );
}

export default App;
