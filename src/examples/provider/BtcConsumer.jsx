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
    if (this.context.btcIndex.loaded) {
      const [buy, sell] = this.context.btcIndex.value
      return (
        <DisplayBtcPrice
          buy={buy}
          sell={sell}
          loading={this.context.btcIndex.loading}
          refresh={this.context.btcIndex.reload}
        />
      )
    }

    return null
  }
}

BtcProvderChild.contextTypes = {
  btcIndex: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    value: PropTypes.arrayOf(btcIndexPropType),
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    reload: PropTypes.func.isRequired,
  })
}
