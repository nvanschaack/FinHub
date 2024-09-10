import React from 'react';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react'
import { getFredData } from '../utils/API'

export default function Sp500() {
  const [spData, setSPData] = useState({});
  const [spDate, setSPDate] = useState('');
  const [olderData, setOlderData] = useState('');

  useEffect(() => {
    const runSP500 = async () => {
      //doing this on the backend instead:
      // fetch(`/api/sp500`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     seriesId: 'sp500'
      //   })
      // })
      //   .then((response) => {
      //     //json() here is a method built in to fetch that allows us to extract actual data thats in the API call
      //     return response.json()
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   })
      const fredData = await getFredData('sp500')
      const data = await fredData.json()

      //to find the data the day before the spData
      const dataDayBefore = data.observations
      const oldData = dataDayBefore[dataDayBefore.length - 2]
      setOlderData(oldData)

      const sp = data.observations.pop()
      setSPData(sp)

      //GET DATE FORMATTED:
      const [year, month, day] = sp.date.split('-').map(Number)
      const date = new Date(year, month - 1, day)
      const formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      setSPDate(formatDate)
    }
    runSP500()
  }, [])

  return (
    <>
      <Card>
        <div className='p-1 flex-center' >
          <p className='custom-font'>S&P 500</p>
          <p className={spData.value > olderData.value ? 'custom-font higher' : 'custom-font lower'}>
            {spData.value} {spData.value > olderData.value ? '↑' : '↓'}
          </p>
          <p className='custom-font'>
            {spDate}
          </p>
        </div>
      </Card>
    </>
  )
}
