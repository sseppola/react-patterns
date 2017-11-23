import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import * as coinApi from '../../api'
import FetchHoc from '../../components/FetchHoc'
import { DisplayBtcPrice } from '../../components/DisplayBtcPrice'

function fetchPrices() {
  return Promise.all([
    coinApi.queryBtcBuyPrice(),
    coinApi.queryBtcSellPrice()
  ])
}

function RenderComponentBtcIndex({ buy, sell, reload }) {
  return <DisplayBtcPrice buy={buy} sell={sell} onClick={reload} />
}

const enhance = compose(
  FetchHoc(fetchPrices)
)

export const HocBtcIndex = enhance(RenderComponentBtcIndex)