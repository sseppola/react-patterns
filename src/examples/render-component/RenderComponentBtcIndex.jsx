import React from 'react';
import PropTypes from 'prop-types';

import * as coinApi from '../../api'
import FetchRenderComponent from '../../components/FetchRenderComponent'
import { DisplayBtcPrice } from '../../components/DisplayBtcPrice'

function fetchPrices() {
  return Promise.all([
    coinApi.queryBtcBuyPrice(),
    coinApi.queryBtcSellPrice()
  ])
}


export function RenderComponentBtcIndex () {
  return (
    <FetchRenderComponent
      fetchFn={fetchPrices}
      render={([buy, sell], { reload }) => (
        <DisplayBtcPrice buy={buy} sell={sell} onClick={reload} />
      )}
    />
  )
}
