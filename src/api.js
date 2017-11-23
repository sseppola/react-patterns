export async function queryBtcBuyPrice(currency = 'USD') {
  const url = `https://api.coinbase.com/v2/prices/BTC-${currency}/buy`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      return Promise.reject('Failed to get BTC buy price')
    }
    return (await res.json()).data
  } catch (error) {
    return Promise.reject('Network error') 
  }
}

export async function queryBtcSellPrice(currency = 'USD') {
  const url = `https://api.coinbase.com/v2/prices/BTC-${currency}/sell`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      return Promise.reject('Failed to get BTC buy price')
    }
    return (await res.json()).data
  } catch (error) {
    return Promise.reject('Network error') 
  }
}

