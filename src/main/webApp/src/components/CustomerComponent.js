import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

const CustomerComponent = () => {
    const alert = useAlert()
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllCustomers()
    }, []);

    const getAllCustomers = () => {
        axios.get("/api/customers")
        .then(response => {
            setCustomers(response.data)
        })
    }

    const deleteCustomer = (id) => {
        axios.delete("/api/customers/" + id)
              .then(response => {
                alert.success('Customer deleted successfully')
                getAllCustomers()
              })
              .catch(error => {
                    alert.error('Error: could not delete customer')
              })
    }

    return (

        <div>
            <h4>Customers</h4>
            <Link to="/add-edit-customer">
                <button className={classnames('btn', 'btn-success', 'float-right')}>Add new Customer</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Birthdate</th>
                        <th>Phone</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.firstName}</td>
                                <td>{c.lastName}</td>
                                <td>{c.birthdate}</td>
                                <td>{c.phone}</td>
                                <td>
                                    <Link to={'/add-edit-customer/' + c.id}>
                                        <button className={classnames('btn', 'btn-sm', 'btn-info')}>Edit</button>
                                    </Link>
                                </td>
                                <td><button className={classnames('btn', 'btn-sm', 'btn-danger')}
                                            onClick={() => deleteCustomer(c.id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CustomerComponent