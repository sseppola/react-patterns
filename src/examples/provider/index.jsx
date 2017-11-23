import React from 'react'

import FetchProvider from './FetchProvider'
import BtcConsumer from './BtcConsumer'
import * as coinApi from '../../api'

function fetchPrices() {
  return Promise.all([
    coinApi.queryBuyPrice(),
    coinApi.querySellPrice()
  ])
}


export default function ProviderBtcIndex() {
  return (
    <FetchProvider fetchFn={fetchPrices}>
      <BtcConsumer />
    </FetchProvider>
  )
}
