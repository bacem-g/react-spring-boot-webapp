import React from 'react'
import Navbar from './Navbar'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import CustomerComponent from './components/CustomerComponent'
import OrderComponent from './components/OrderComponent'
import ProductComponent from './components/ProductComponent'
import AddCustomerComponent from './components/AddCustomerComponent';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={CustomerComponent} />
        <Route path="/customers/" component={CustomerComponent} />
        <Route path="/orders/" component={OrderComponent} />
        <Route path="/products/" component={ProductComponent} />
        <Route path="/add-edit-customer/:id?" component={AddCustomerComponent} />
      </div>
    </Router>
  );
}

export default App;
