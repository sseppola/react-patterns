import React from 'react';

import * as coinApi from '../../api'
import FetchRenderComponent from './FetchRenderComponent'
import { DisplayBtcPrice } from '../../components/DisplayBtcPrice'

function fetchPrices() {
  return Promise.all([
    coinApi.queryBuyPrice(),
    coinApi.querySellPrice()
  ])
}


export default function RenderComponentBtcIndex () {
  return (
    <FetchRenderComponent
      fetchFn={fetchPrices}
      render={([buy, sell], { reload }) => (
        <DisplayBtcPrice buy={buy} sell={sell} onClick={reload} />
      )}
    />
  )
}
