import React from 'react'
import PropTypes from 'prop-types'

import { DisplayBtcPrice } from '../../components/DisplayBtcPrice'
import { ErrorDisplay } from '../../components/ErrorDisplay'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import btcIndexPropType from '../../propTypes/btcIndexPropType'



export default class BtcProvderChild extends React.Component {
  render() {
    if (this.context.btcIndex.loading && !this.context.btcIndex.loaded) {
      return <LoadingIndicator />;
    }
    if (this.context.btcIndex.error) {
      return <ErrorDisplay message={this.context.btcIndex.errorMsg} />
    }
    if (!this.context.btcIndex.loaded) {
      return null
    }

    return (
      <DisplayBtcPrice
        buy={this.context.btcIndex.buy}
        sell={this.context.btcIndex.sell}
        onClick={this.context.btcIndex.refreshPrice}
      />
    )
  }
}

BtcProvderChild.contextTypes = {
  btcIndex: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    buy: btcIndexPropType,
    sell: btcIndexPropType,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    refreshPrice: PropTypes.func.isRequired,
  })
}
