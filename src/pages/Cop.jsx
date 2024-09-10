import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import { useEffect, useState } from 'react'
import { getCOPData } from '../utils/API';

export default function Cop() {
  const [COPdata, setCOPData] = useState({});
  const [copDate, setCopDate] = useState('');
  const [dataDayBefore, setDataDayBefore] = useState('');

  useEffect(() => {
    const runCOP = async () => {
      const COPData = await getCOPData()
      const data = await COPData.json()
      const d2 = data.data
      const dataBefore = d2[1]
      // console.log(data);
      const COPInfo = data.data[0]

      //GET DATE FORMATTED
      const [year, month, day] = COPInfo.date.split('-').map(Number);
      const date = new Date(year, month - 1, day)
      const formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      setCopDate(formatDate);

      setCOPData(COPInfo)
      setDataDayBefore(dataBefore)
    }
    runCOP()
  }, [])

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      dollars per barrel
    </Tooltip>
  );

  return (
    <>
      <Card >
        <div className='p-1 flex-center' >
          <p  className='custom-font'>Crude Oil Prices</p>
          
          <p className={COPdata.value > dataDayBefore.value ? 'custom-font higher' : 'custom-font lower'}>
            {COPdata?.value && (
              <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip}
              >
                {({ ref, ...triggerHandler }) => (

                  <>
                    ${COPdata.value}
                    <span ref={ref} className="ms-1">DPB</span>
                    <span {...triggerHandler} >*</span>
                  </>
                )}
              </OverlayTrigger>
            )} {COPdata.value > dataDayBefore.value ? '↑' : '↓'}
          </p>
          <p className='custom-font'>
            {copDate}
          </p>
        </div>
      </Card>
    </>
  )
}
