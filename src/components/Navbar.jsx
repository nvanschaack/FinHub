import Nav from 'react-bootstrap/Nav'

export default function Navbar() {
    return (
        <Nav className='flex-column '>
            <Nav.Link href="/SOFR" className='bg-body-tertiary my-2' >SOFR</Nav.Link>
            <Nav.Link href="/SP500" className='bg-body-tertiary my-2'>S&P 500</Nav.Link>
            <Nav.Link href="/TYTR" className='bg-body-tertiary my-2'>10-year Treasury Rate</Nav.Link>
            <Nav.Link href="/VIX" className='bg-body-tertiary my-2'>VIX</Nav.Link>
            <Nav.Link href="/COP" className='bg-body-tertiary my-2'>Crude Oil Prices</Nav.Link>
            <Nav.Link href="/EUROTOUS" className='bg-body-tertiary my-2'>Euro/US Exchange</Nav.Link>
        </Nav>
    )
}
