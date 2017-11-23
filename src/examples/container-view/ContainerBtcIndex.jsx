import React from 'react';
import PropTypes from 'prop-types';

import * as coinApi from '../../api'
import { DisplayBtcPrice } from '../../DisplayBtcPrice'

export class VanillaBtcIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false, loading: false }
    this.refreshPrice = this.refreshPrice.bind(this)
  }

  componentDidMount() {
    this.refreshPrice()
  }

  refreshPrice() {
    this.setState({ loading: true })
    Promise.all([
      coinApi.queryBtcBuyPrice(),
      coinApi.queryBtcSellPrice()
    ])
    .then(([buy, sell]) => {
      this.setState({ buy , sell, loaded: true, loading: false  })
    })
    .catch((errorMsg) => {
      this.setState({ error: true, errorMsg })
    })
  }

  render() {
    const { buy, sell, loaded, loading, error, errorMsg } = this.state

    if (loaded) {
      return <DisplayBtcPrice buy={buy} sell={sell} refreshPrice={onClick={this.refreshPrice}} />
    }

    if (loading) {
      return <p>loading...</p>;
    }
    if (error) {
      return <p style={{ color: 'red' }}>{errorMsg}</p>
    }

    return null
  }
}
