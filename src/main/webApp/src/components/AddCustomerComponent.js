import React, { useState, useEffect, useContext } from 'react'
import CountryList from './CountryListComponent'
import classnames from 'classnames'
import axios from 'axios';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import UserContext from '../common/context/UserContext';

const AddCustomerComponent = (props) => {
    const userContext = useContext(UserContext)
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
}, [alert, props.match])

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
                } else {
                    alert.success('Customer has been updated')
                }
                props.history.push('/customers')
            })
            .catch(error => {
                alert.error('Error: Could not save the customer')
            })
    }

    const validateForm = () => {
        let formErrors = {}
        const dateRegEx = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/
        formErrors.firstName = form.firstName === '' ? <FormattedMessage id="firstNamerequired" />: null
        formErrors.lastName = form.lastName === '' ? <FormattedMessage id="lastNamerequired" />: null
        formErrors.birthdate = form.birthdate === '' ? <FormattedMessage id="birthdateRequired" />: null
        formErrors.birthdate = !form.birthdate.match(dateRegEx) ? <FormattedMessage id="birthdateFormatError" /> : null

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
            {pageType === 'ADD' && <h4 className='text-center'><FormattedMessage id='addNewCustomer' /></h4>}
            {pageType === 'EDIT' && <h4 className='text-center'><FormattedMessage id='editCustomer' /></h4>}
            <br />
            <form onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    saveCustomer(event)
                                }
                              }} >
                <div className={classnames('form-group', 'row')} >
                    <label className="col-sm-2 col-form-label"><FormattedMessage id='firstname' /></label>
                    <div className='col-sm-4'>
                        <input id="firstName" type="text"
                            className={classnames('form-control', formErrors.firstName && 'border-danger')}
                            onChange={handleFormChange} value={form.firstName}/>
                        {formErrors.firstName && <span className='text-danger'>{formErrors.firstName}</span>}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><FormattedMessage id='lastname' /></label>
                    <div className="col-sm-4">
                        <input id="lastName" type="text"
                            className={classnames('form-control', formErrors.lastName && 'border-danger')}
                            onChange={handleFormChange} value={form.lastName}/>
                        {formErrors.lastName && <span className='text-danger'>{formErrors.lastName}</span>}

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><FormattedMessage id='birthdate' /></label>
                    <div className="col-sm-4">
                        <input id="birthdate" type="text"
                            className={classnames('form-control', formErrors.birthdate && 'border-danger')}
                            onChange={handleFormChange} value={form.birthdate}/>
                        {formErrors.birthdate && <span className='text-danger'>{formErrors.birthdate}</span>}

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><FormattedMessage id='phone' /></label>
                    <div className="col-sm-4">
                        <input id="phone" type="number" className="form-control"
                            onChange={handleFormChange} value={form.phone}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><FormattedMessage id='country' /></label>
                    <div className="col-sm-4">
                        <CountryList onSelect={handleAddressChange}
                            selectedCountry={form.address.country}
                            errorMessage={formErrors.country}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><FormattedMessage id='city' /></label>
                    <div className="col-sm-4">
                        <input id="city" type="text" className="form-control"
                            onChange={handleAddressChange} value={form.address.city}/>
                    </div>
                </div>
            </form>
            <div className="col-sm-6">

                <button className={classnames('btn', 'btn-info', 'float-right', 'mx-1')}
                    onClick={saveCustomer}><FormattedMessage id='save' /></button>
                <Link to="/customers">
                    <button className={classnames('btn', 'btn-secondary', 'float-right')}><FormattedMessage id='back' /></button>
                </Link>
            </div>
        </div >
    )
}

export default AddCustomerComponent