import React, { useState, useEffect } from 'react'
import CountryList from './CountryListComponent'
import classnames from 'classnames'
import axios from 'axios';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'

const AddCustomerComponent = (props) => {
    const alert = useAlert()
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        birthdate: '',
        phone: '',
        address: { country: '', city: '' }
    })
    const [pageType, setPagetype] = useState('ADD')
    const [formErrors, setFormErrors] = useState(
        {
            firstName: null,
            lastName: null,
            birthdate: null,
            country: null,
        }
    )

useEffect(() => {
    const { params } = props.match;
    if(params.id) {
        setPagetype('EDIT')
        axios.get('/api/customers/' + params.id)
              .then(res => {
                  setForm(res.data)
              })
              .catch(error => {
                    alert.error('Could not retrive customer with id ' + params.id)
              })
    }
}, [])

    const handleFormChange = (event) => {
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    const handleAddressChange = (event) => {
        setForm({ ...form, address: { ...form.address, [event.target.id]: event.target.value } })
    }

    const saveCustomer = (event) => {
        event.preventDefault();
        if(!validateForm()) {
            return
        }

        axios.post("/api/customers", form)
            .then(response => {
                if(pageType === 'ADD') {
                    alert.success('Customer has been created')
                    clearForm()
                } else {
                    alert.success('Customer has been updated')
                    props.history.push('/customers')
                }
            })
            .catch(error => {
                alert.error('Error: Could not save the customer')
            })
    }

    const validateForm = () => {
        let formErrors = {}
        const dateRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/
        //formErrors.firstName = form.firstName === '' ? 'firstName is required': null
        formErrors.lastName = form.lastName === '' ? 'lastName is required': null
        formErrors.birthdate = form.birthdate === '' ? 'birthdate is required': null
        formErrors.birthdate = !form.birthdate.match(dateRegEx) ? 'birthdate should be in the format dd/MM/yyyy' : null
        formErrors.country = form.address.country === '' ? 'country is required' : null

        setFormErrors(formErrors)

        if(Object.values(formErrors).every(x => (x === null || x === ''))) {
            return true
        }

        return false
    }

    const clearForm = () => {
        const newForm = {
            firstName: '',
            lastName: '',
            birthdate: '',
            phone: '',
            address: { country: '', city: '' }
        }

        setForm(newForm)
    }

    return (
        <div>
            {pageType === 'ADD' && <h4>Add new customer</h4>}
            {pageType === 'EDIT' && <h4>Edit customer</h4>}
            <br />
            <form>
                <div className={classnames('form-group', 'row')} >
                    <label className="col-sm-2 col-form-label">First name</label>
                    <div className='col-sm-4'>
                        <input id="firstName" type="text"
                            className={classnames('form-control', formErrors.firstName && 'border-danger')}
                            placeholder="First name"
                            onChange={handleFormChange} value={form.firstName}/>
                        {formErrors.firstName && <span className='text-danger'>{formErrors.firstName}</span>}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Last name</label>
                    <div className="col-sm-4">
                        <input id="lastName" type="text"
                            className={classnames('form-control', formErrors.lastName && 'border-danger')}
                        placeholder="Last name"
                            onChange={handleFormChange} value={form.lastName}/>
                        {formErrors.lastName && <span className='text-danger'>{formErrors.lastName}</span>}

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Birthdate</label>
                    <div className="col-sm-4">
                        <input id="birthdate" type="text"
                            className={classnames('form-control', formErrors.birthdate && 'border-danger')}
                            placeholder="Birthdate"
                            onChange={handleFormChange} value={form.birthdate}/>
                        {formErrors.birthdate && <span className='text-danger'>{formErrors.birthdate}</span>}

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-4">
                        <input id="phone" type="number" className="form-control" placeholder="Phone"
                            onChange={handleFormChange} value={form.phone}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Country</label>
                    <div className="col-sm-4">
                        <CountryList onSelect={handleAddressChange}
                            selectedCountry={form.address.country}
                            errorMessage={formErrors.country}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">City</label>
                    <div className="col-sm-4">
                        <input id="city" type="text" className="form-control" placeholder="City"
                            onChange={handleAddressChange} value={form.address.city}/>
                    </div>
                </div>
            </form>
            <div className="col-sm-6">

                <button className={classnames('btn', 'btn-primary', 'float-right', 'mx-1')}
                    onClick={saveCustomer}>Save</button>
                <Link to="/customers">
                    <button className={classnames('btn', 'btn-secondary', 'float-right')}>Back</button>
                </Link>
            </div>
        </div >
    )
}

export default AddCustomerComponent