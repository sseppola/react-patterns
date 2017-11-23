function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export async function queryBtcBuyPrice(crypto = 'BTC', currency = 'USD') {
  const url = `https://api.coinbase.com/v2/prices/${crypto}-${currency}/buy`
  await wait(500)

  try {
    const res = await fetch(url, { headers: { 'CB-VERSION': '2015-04-08' }})
    if (!res.ok) {
      return Promise.reject('Failed to get BTC buy price')
    }
    return (await res.json()).data
  } catch (error) {
    return Promise.reject('Network error') 
  }
}

export async function queryBtcSellPrice(crypto = 'BTC', currency = 'USD') {
  const url = `https://api.coinbase.com/v2/prices/${crypto}-${currency}/sell`
  await wait(500)

  try {
    const res = await fetch(url, { headers: { 'CB-VERSION': '2015-04-08' }})
    if (!res.ok) {
      return Promise.reject('Failed to get BTC buy price')
    }
    return (await res.json()).data
  } catch (error) {
    return Promise.reject('Network error') 
  }
}

