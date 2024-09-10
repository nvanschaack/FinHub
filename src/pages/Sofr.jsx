import React from 'react';
import Card from 'react-bootstrap/Card';
//on page load, useEffect allows code to run a fxn on component render
import { useEffect, useState } from 'react'



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

  // console.log(sofrData);


  return (
    <>
      <Card>
        <div className='p-1 flex-center' >
          <p className='custom-font'>{sofrData.type}</p>
          <p className='custom-font'>
            {sofrData.percentRate}%
          </p>
          <p className='custom-font'>
            {sofrDate}
          </p>
        </div>
      </Card>
    </>
  )
}
