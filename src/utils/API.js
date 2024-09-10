//this function is passing data through the  request body
//using this for SP500 & VIX
export const getFredData = (ticker)=> {
    return fetch('https://finance-server-zex6.onrender.com/api/data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seriesId: ticker
        })
      })
}

//passing data through the url parameter, only use the fxn above OR this one, not both
// export const getFredDataParams = (ticker)=> {
//     return fetch(`/api/data/${ticker}`)
// }

//using this for COP
export const getCOPData = () => {
return fetch('https://finance-server-zex6.onrender.com/api/COPdata')
}

//using this for TYTR
export const getTYTR = () => {
  return fetch('https://finance-server-zex6.onrender.com/api/TYTR')
}

//using this for Euro to US
export const getEuroToUSD = () => {
  return fetch('https://finance-server-zex6.onrender.com/api/EuroToUSD')
}