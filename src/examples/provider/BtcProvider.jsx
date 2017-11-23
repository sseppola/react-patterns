import React, { Children } from 'react'
import PropTypes from 'prop-types'

import * as coinApi from '../../api'
import btcIndexPropType from '../../propTypes/btcIndexPropType'

function fetchPrices() {
  return Promise.all([
    coinApi.queryBuyPrice(),
    coinApi.querySellPrice()
  ])
}


export default class BtcProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loading: false,
      buy: null,
      sell: null,
      error: null,
      errorMsg: null,
    }
    this.refreshPrice = this.refreshPrice.bind(this)
  }

  componentDidMount() {
    this.refreshPrice()
  }

  getChildContext() {
    const btcIndex = {
      loading: this.state.loading,
      loaded: this.state.loaded,
      buy: this.state.buy,
      sell: this.state.sell,
      refreshPrice: this.refreshPrice,
    }
    return { btcIndex }
  }

  refreshPrice() {
    this.setState({ loading: true })
    fetchPrices()
    .then(([buy, sell]) => {
      this.setState({ buy , sell, loaded: true, loading: false  })
    })
    .catch((errorMsg) => {
      this.setState({ error: true, errorMsg })
    })
  }

  render() {
    return Children.only(this.props.children)
  }
}

BtcProvider.propTypes = {
  children: PropTypes.node,
}

BtcProvider.childContextTypes = {
  btcIndex: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    buy: btcIndexPropType,
    sell: btcIndexPropType,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    refreshPrice: PropTypes.func.isRequired,
  }).isRequired
}
