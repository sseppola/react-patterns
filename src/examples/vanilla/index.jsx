import React from 'react';

import * as coinApi from '../../api'

export default class VanillaBtcIndex extends React.Component {
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
      coinApi.queryBuyPrice(),
      coinApi.querySellPrice()
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
      return (
        <div className="pointer" onClick={this.refreshPrice}>
          <p>Buy: {buy.amount} {buy.currency}</p>
          <p>Sell: {sell.amount} {sell.currency}</p>
        </div>
      )
    }

    if (loading) {
      return <div className="bg-blue white tc pa3"><p>loading...</p></div>;
    }
    if (error) {
      return <p className="red">{errorMsg}</p>
    }

    return null
  }
}
