import React from 'react';
import Card from 'react-bootstrap/Card';
//on page load, useEffect allows code to run a fxn on component render
import { useEffect, useState } from 'react'
import { routeChange } from '../utils/RouteChange';

export default function Sofr() {
  //on page load, the state of sofrData is an empty obejct, then setSofrData on line 18 sets sofrdata to sofrRateData[0]
  const [sofrData, setSofrData] = useState({})
  const [sofrDate, setSofrDate] = useState('')

  useEffect(() => {
    //no issues retrieveing data on the front end for SOFR, unlike all of the other endpoints
    const runSOFR = () => {
      //newyorkfed API
      fetch('https://markets.newyorkfed.org/api/rates/secured/all/latest.json')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          //filtering through the array that is returned from this fetch to just get the SOFR data
          const sofrRateData = data.refRates.filter((rate) => rate.type === 'SOFR')
          setSofrData(sofrRateData[0]);

          //GET DATE FORMATTED:
          const [year, month, day] = sofrRateData[0].effectiveDate.split('-').map(Number)
          const date = new Date(year, month - 1, day)
          const formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
          setSofrDate(formatDate)
        })
    }
    runSOFR()
  }, [])

  return (
    <>
      <Card onClick={() => routeChange('https://www.google.com/search?q=sofr+rate&sca_esv=0a7eec0d77041e07&rlz=1C5GCCA_en&sxsrf=ADLYWIL2NA6b54jrQtUXMQiluVZz1E970A%3A1726068638096&ei=nrfhZoapBcC2wN4Pn9T-wAM&oq=sofr&gs_lp=Egxnd3Mtd2l6LXNlcnAiBHNvZnIqAggAMgoQIxiABBgnGIoFMhEQABiABBiRAhixAxiDARiKBTIREAAYgAQYkQIYsQMYgwEYigUyEBAAGIAEGLEDGEMYgwEYigUyChAAGIAEGEMYigUyCBAuGIAEGLEDMgoQABiABBhDGIoFMggQABiABBixAzILEAAYgAQYsQMYgwEyCxAAGIAEGLEDGIMBSKAPUABYqwNwAHgBkAEAmAFdoAHQAqoBATS4AQPIAQD4AQGYAgSgAuQCwgILEC4YgAQY0QMYxwHCAhEQLhiABBixAxjRAxiDARjHAcICCxAAGIAEGJECGIoFwgIKEC4YgAQYQxiKBZgDAJIHATSgB7kt&sclient=gws-wiz-serp')}>
        <div className='p-1 flex-center' >
          <div className='align-cards'>
            <p className='custom-font'>{sofrData.type}</p>
          </div>
          <div className='align-cards'>
            <p className='custom-font'>
              {sofrData.percentRate}%
            </p>
          </div>
          <div className='align-cards'>
            <p className='custom-font'>
              {sofrDate}
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}
