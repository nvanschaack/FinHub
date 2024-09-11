import React from 'react';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react'
import { getEuroToUSD } from '../utils/API';
import { routeChange } from '../utils/RouteChange';

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
      const data = await currencyExchangeData.json();

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
      <Card onClick={()=> routeChange('https://www.google.com/search?q=euro+to+usd+conversion&sca_esv=0a7eec0d77041e07&rlz=1C5GCCA_en&sxsrf=ADLYWIKJ51QdVkrmMtpxrTvJeF4E1jVg9Q%3A1726068553952&ei=SbfhZp_mOcu9kPIPk9X2kA4&oq=euro+to+usd&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2V1cm8gdG8gdXNkKgIIATIWEAAYgAQYkQIYsQMYgwEYigUYRhiCAjIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjROFC_A1j8InABeAGQAQCYAd0BoAHAB6oBBTkuMS4xuAEByAEA-AEBmAIMoALpB8ICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIKECMYgAQYJxiKBcICERAuGIAEGJECGNEDGMcBGIoFwgILEAAYgAQYkQIYigXCAhEQLhiABBixAxjRAxiDARjHAcICCxAAGIAEGLEDGIMBwgIOEC4YgAQYsQMY0QMYxwHCAgoQABiABBhDGIoFwgINEAAYgAQYsQMYQxiKBcICEBAAGIAEGLEDGEMYgwEYigXCAgoQLhiABBhDGIoFwgIQEC4YgAQY0QMYQxjHARiKBcICERAAGIAEGJECGLEDGIMBGIoFwgIIEAAYgAQYsQPCAgcQLhiABBgKwgIVEAAYgAQYsQMYQxiDARiKBRhGGIICmAMAiAYBkAYJkgcGMTAuMS4xoAfqXA&sclient=gws-wiz-serp')}>
        <div className='p-1 flex-center' >
          <div className='align-cards'>
            <p className='custom-font'>{EurToUs.fromCur} to {EurToUs.toCur} Rate</p>
          </div>
          <div className='align-cards'>
            <p className='custom-font'>
              1 EURO = ${EurToUs.rate}
            </p>
          </div>
          <div className='align-cards'>
            <p className='custom-font'>
              {EurToUs.date}
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}
