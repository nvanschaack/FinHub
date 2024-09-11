import React from 'react';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import { useEffect, useState } from 'react'
import { getCOPData } from '../utils/API';
import { routeChange } from '../utils/RouteChange';

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
      <Card onClick={() => routeChange('https://www.google.com/search?q=crude+oil+price+wti+&sca_esv=0a7eec0d77041e07&rlz=1C5GCCA_en&sxsrf=ADLYWII60zVhL42P7y2o7J_YXJCaL5V-PQ%3A1726068452700&ei=5LbhZt6pKr_fp84PodHDiAI&ved=0ahUKEwjeq-yHmruIAxW_78kDHaHoECEQ4dUDCBA&uact=5&oq=crude+oil+price+wti+&gs_lp=Egxnd3Mtd2l6LXNlcnAiFGNydWRlIG9pbCBwcmljZSB3dGkgMgQQIxgnMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5IggxQ9ARY_QlwAXgBkAEBmAHYAaAB2QSqAQU0LjEuMbgBA8gBAPgBAZgCBqACkgPCAgoQABiwAxjWBBhHwgIIEAAYgAQYogTCAggQABiiBBiJBZgDAIgGAZAGCJIHAzUuMaAH4SI&sclient=gws-wiz-serp')}>
        <div className='p-1 flex-center' >
          <div className='align-cards'>
            <p className='custom-font'>Crude Oil Prices</p>
          </div>
          <div className='align-cards'>
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
          </div>
          <div className='align-cards'>
            <p className='custom-font'>
              {copDate}
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}
