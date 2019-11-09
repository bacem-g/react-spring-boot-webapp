import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import withDirection, { withDirectionPropTypes, DIRECTIONS } from 'react-with-direction';
import { tsPropertySignature } from '@babel/types';


const CustomerComponent = (props) => {
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
            <h4 className='text-center'><FormattedMessage id='customers' /></h4>
            <br />
            <Link to="/add-edit-customer">
                <button className={classnames('btn', 'btn-success', 'float-right')}><FormattedMessage id='addNewCustomer' /></button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th><FormattedMessage id='id' /></th>
                        <th><FormattedMessage id='firstname' /></th>
                        <th><FormattedMessage id='lastname' /></th>
                        <th><FormattedMessage id='birthdate' /></th>
                        <th><FormattedMessage id='phone' /></th>
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
                                        <button className={classnames('btn', 'btn-sm', 'btn-info')}><FormattedMessage id='edit' /></button>
                                    </Link>
                                </td>
                                <td><button className={classnames('btn', 'btn-sm', 'btn-danger')}
                                            onClick={() => deleteCustomer(c.id)}><FormattedMessage id='delete' /></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default withDirection(CustomerComponent)