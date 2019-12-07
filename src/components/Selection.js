import React from 'react'

Selection = (props) => {
    return (
        <select className={props.class} onChange={props.handleChange}>
            {props.country.map(country => (<option key={country} value={country}>{country}</option>))}
        </select>
    )
}

export default Selection