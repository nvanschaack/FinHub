import React from 'react';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useEffect, useState } from 'react'
import { getTYTR } from '../utils/API';
import { routeChange } from '../utils/RouteChange';

export default function Tytr() {

  const [tytrData, setTYTRData] = useState({});
  const [tytrDate, setTYTRDate] = useState('');
  const [dataMonthOlder, setDataMonthOlder] = useState('');

  useEffect(() => {
    const runTYTR = async () => {
      const TYTRdata = await getTYTR()
      const data = await TYTRdata.json()

      const dataMonthBefore = data.data[1]

      setDataMonthOlder(dataMonthBefore);
      setTYTRData(data);

      //GET DATE FORMATTED:
      // console.log(data.data[0].date);
      const [year, month, day] = data.data[0].date.split('-').map(Number)
      const date = new Date(year, month - 1, day)
      const formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      setTYTRDate(formatDate)

    }
    runTYTR()
  }, [])

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} >
      10-Year Treasury Rate (Monthly)
    </Tooltip>
  );

  if (!tytrData.data) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Card onClick={() => routeChange('https://www.cnbc.com/quotes/US10Y')}>
        <div className='p-1 flex-center'>
          <div className='align-cards'>
            <p className='custom-font'>
              {tytrData?.name &&
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip}
                >
                  {({ ref, ...triggerHandler }) => (

                    <>
                      {/* ({tytrData.interval}) */}
                      <span ref={ref} className="ms-1">TYTR </span>
                      <span {...triggerHandler} >*</span>
                    </>
                  )}
                </OverlayTrigger>
              }
            </p>
          </div>
          <div className='align-cards'>
            <p className={tytrData.data[0].value > dataMonthOlder ? 'custom-font higher' : 'custom-font lower'}>
              {tytrData.data[0].value}% {tytrData.data[0].value > dataMonthOlder ? '↑' : '↓'}
            </p>
          </div>
          <div className='align-cards'>
            <p className='custom-font'>
              {tytrDate}
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}
