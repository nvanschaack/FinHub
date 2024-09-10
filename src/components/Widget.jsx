import React from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from './Navbar'
// import logo from '../assets/financelogo.png'

export default function Widget() {

    const todaysDate = new Date().toLocaleDateString()
    // console.log(todaysDate);

    return (
        <div className='p-3 col d-flex flex-column align-items-center vh-100'>
            {/* <h1><a style={{ textDecoration: 'none'}} href="/">📈Finance Widget📉</a></h1> */}
            {/* <Navbar /> */}
            {/* <img src={logo} alt="" className='logo' /> */}
            <strong><p className='m-2 '>{todaysDate}</p></strong>
        </div>
    )
}
