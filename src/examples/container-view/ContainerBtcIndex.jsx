import React from 'react';
import PropTypes from 'prop-types';

import * as coinApi from '../../api'
import { DisplayBtcPrice } from '../../components/DisplayBtcPrice'
import { ErrorDisplay } from '../../components/ErrorDisplay'
import { LoadingIndicator } from '../../components/LoadingIndicator'

export class ContainerBtcIndex extends React.Component {
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
      return <DisplayBtcPrice buy={buy} sell={sell} onClick={this.refreshPrice} />
    }

    if (loading) {
      return <LoadingIndicator />;
    }
    if (error) {
      return <ErrorDisplay message={errorMsg} />
    }

    // notice that this state is possible unless we initialize with { loading: true }
    return null
  }
}
