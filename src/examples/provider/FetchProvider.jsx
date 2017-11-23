import React, { Children } from 'react'
import PropTypes from 'prop-types'


export default class BtcProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loading: false,
      value: null,
      error: null,
      errorMsg: null,
    }
    this.reload = this.reload.bind(this)
  }

  componentDidMount() {
    this.reload()
  }

  getChildContext() {
    const btcIndex = {
      loading: this.state.loading,
      loaded: this.state.loaded,
      value: this.state.value,
      reload: this.reload,
    }
    return { btcIndex }
  }

  reload() {
    this.setState({ loading: true })
    this.props.fetchFn()
    .then((value) => {
      this.setState({ value, loaded: true, loading: false  })
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
  fetchFn: PropTypes.func.isRequired,
  children: PropTypes.node,
}

BtcProvider.childContextTypes = {
  btcIndex: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    value: PropTypes.any,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    reload: PropTypes.func.isRequired,
  }).isRequired
}
