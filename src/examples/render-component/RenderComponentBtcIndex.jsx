import React from 'react';
import PropTypes from 'prop-types';

import * as coinApi from '../../api'
import FetchRenderComponent from '../../components/FetchRenderComponent'
import { DisplayBtcPrice } from '../../components/DisplayBtcPrice'

function fetchPrices() {
  return Promise.all([
    coinApi.queryBuyPrice(),
    coinApi.querySellPrice()
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
