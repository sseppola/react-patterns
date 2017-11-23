import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import * as coinApi from '../../api'
import FetchHoc from './FetchHoc'
import { DisplayBtcPrice } from '../../components/DisplayBtcPrice'
import btcIndexPropType from '../../propTypes/btcIndexPropType'

function fetchPrices() {
  return Promise.all([
    coinApi.queryBuyPrice(),
    coinApi.querySellPrice()
  ])
}

function _HocBtcIndex({ btcIndex: { buy, sell, reload }}) {
  return <DisplayBtcPrice buy={buy} sell={sell} onClick={reload} />
}

_HocBtcIndex.propTypes = {
  btcIndex: PropTypes.shape({
    buy: btcIndexPropType.isRequired,
    sell: btcIndexPropType.isRequired,
    reload: PropTypes.func.isRequired,
  }).isRequired
}

const enhance = compose(
  FetchHoc(fetchPrices)
)

export const HocBtcIndex = enhance(_HocBtcIndex)