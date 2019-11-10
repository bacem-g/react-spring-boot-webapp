import React, { useState } from 'react'
import LocaleContext from '../context/LocaleContext'

const LocaleProvider = (props) => {

    const [locale, setLocale] = useState('ar')

    const switchLanguage = (lang) => {
        setLocale(lang)
        localStorage.setItem('locale', lang)
        props.switchLanguage(lang)
    }


    return (
        <LocaleContext.Provider
            value={{
                lang: locale,
                switchLanguage: switchLanguage
            }}>
            {props.children}
        </LocaleContext.Provider>
    )
}

export default LocaleProvider