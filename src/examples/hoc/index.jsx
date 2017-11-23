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

function _HocBtcIndex({ value: [buy, sell], reload, loading }) {
  return <DisplayBtcPrice buy={buy} sell={sell} refresh={reload} loading={loading} />
}

_HocBtcIndex.propTypes = {
  loading: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(btcIndexPropType),
}

const enhance = compose(
  FetchHoc(fetchPrices)
)

const HocBtcIndex = enhance(_HocBtcIndex)

export default HocBtcIndex