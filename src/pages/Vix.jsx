import React from 'react';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react'
import { getFredData } from '../utils/API'
import { routeChange } from '../utils/RouteChange';

export default function Vix() {
  const [vixData, setVixData] = useState({});
  const [vixDate, setVIXDate] = useState('');
  const [olderVixData, setOlderVixData] = useState('');

  useEffect(() => {
    const runVIX = async () => {
      const fredData = await getFredData('vixcls')
      const data = await fredData.json()
      //getting data from day before
      const old = data.observations[data.observations.length - 2]
      const oldData = old.value
      //most real time data:
      const vix = data.observations.pop()
      //set real time data
      setVixData(vix)
      //set day older data
      setOlderVixData(oldData)

      //GET DATE FORMATTED:
      const [year, month, day] = vix.date.split('-').map(Number)
      const date = new Date(year, month - 1, day)
      const formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      setVIXDate(formatDate)
    }
    runVIX()
  }, [])

  return (
    <>
      <Card onClick={() => routeChange('https://www.google.com/search?q=vix+index&rlz=1C5GCCA_en&oq=vix&gs_lcrp=EgZjaHJvbWUqEggBEAAYQxiDARixAxiABBiKBTIPCAAQRRg7GIMBGLEDGIAEMhIIARAAGEMYgwEYsQMYgAQYigUyEggCEAAYFBiDARiHAhixAxiABDINCAMQABiDARixAxiABDIKCAQQABixAxiABDINCAUQABiDARixAxiABDINCAYQABiDARixAxiABDIGCAcQRRg80gEIMTk2MGowajSoAgCwAgA&sourceid=chrome&ie=UTF-8')}>
        <div className='p-1 flex-center'>
          <div className='align-cards'>
            <p className='custom-font'>VIX</p>
          </div>
          <div className='align-cards'>
            <p className={vixData.value > olderVixData ? 'custom-font higher' : 'custom-font lower'}>
              {vixData.value} {vixData.value > olderVixData ? '↑' : '↓'}
            </p>
          </div>
          <div className='align-cards'>
            <p className='custom-font'>
              {vixDate}
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}
