import React from 'react';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react'
import { getEuroToUSD } from '../utils/API';

export default function EuroToUs() {

  const [EurToUs, setEurToUs] = useState({
    fromCur: '',
    toCur: '',
    rate: 0,
    date: ''
  })

  useEffect(() => {
    const runEuroToUs = async () => {
      //bring in the API
      const currencyExchangeData = await getEuroToUSD()
      //convert fetched data from API to readable format
      const data = await currencyExchangeData.json()

      //bracket notation works similar to dot notation, but useful when there's spaces
      const dataDate = data['Realtime Currency Exchange Rate']['6. Last Refreshed']

      const dataRate = parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate'])

      setEurToUs({
        fromCur: data['Realtime Currency Exchange Rate']['1. From_Currency Code'],
        toCur: data['Realtime Currency Exchange Rate']['3. To_Currency Code'],
        rate: dataRate.toFixed(2),
        date: new Date(dataDate).toLocaleDateString()
      })
    }
    runEuroToUs()
  }, [])

  // console.log(EurToUs);

  return (
    <>
      <Card>
        <div className='p-1 flex-center' >
          <p className='custom-font'>{EurToUs.fromCur} to {EurToUs.toCur} Rate</p>
          <p className='custom-font'>
            1 EURO = ${EurToUs.rate}
          </p>
          <p className='custom-font'>
            {EurToUs.date}
          </p>
        </div>
      </Card>
    </>
  )
}
