import React, { useState } from 'react';
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
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import LocaleProvider from './common/provider/LocaleProvider';
import { IntlProvider, addLocaleData } from "react-intl"
import messages_ar from './locale/ar.json'
import messages_en from './locale/en.json'
import locale_en from 'react-intl/locale-data/en';
import locale_ar from 'react-intl/locale-data/ar';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

const messages = {
  'ar': messages_ar,
  'en': messages_en
}

addLocaleData([...locale_en, ...locale_ar]);

function App() {
  configureAxiosInterceptors()

  const alertOptions = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }

  const [locale, setLocale] = useState('en')
  const [direction, setDirection] = useState(DIRECTIONS.LTR)

  const switchLanguage = (lang) => {
    setLocale(lang)
    switch(lang) {
      case 'ar': 
        setDirection(DIRECTIONS.RTL)
        break
      case 'en':
        setDirection(DIRECTIONS.LTR)
        break
    }
  }

  return (
    <DirectionProvider direction={direction} inline={true}>
      <LocaleProvider switchLanguage={switchLanguage}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
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
          </AlertProvider>
        </IntlProvider>
      </LocaleProvider>
    </DirectionProvider>
  );
}

export default App;
