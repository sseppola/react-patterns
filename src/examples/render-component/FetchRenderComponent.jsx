import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../components/LoadingIndicator'
import { ErrorDisplay } from '../../components/ErrorDisplay'


export default class FetchOrCatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      value: null,
      error: null,
    }
    this._fetchData = this._fetchData.bind(this)
    this._setState = this._setState.bind(this)
  }

  componentDidCatch(thrownError, info) {
    this.setState({ error: thrownError })
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    this.setState(Object.assign({}, this.state, {
      loading: true,
    }))

    this.props.fetchFn()
    .then(result => {
      this._setState(() => ({
        value: result,
        loading: false,
        error: false,
      }))
    })
    .catch(errorMsg => {
      this._setState(() => ({
        loading: false,
        error: true,
        errorMsg,
      }))
    })
  }

  _setState() {
    setTimeout(() => this.setState.apply(this, arguments))
  }

  render() {
    const { loading, value, error } = this.state

    if (loading && !value) {
      return this.props.renderLoading()
    }

    if (error) {
      return this.props.renderError(error)
    }


    return this.props.render(value, { reload: this._fetchData, loading })
  }
}

FetchOrCatch.propTypes = {
  fetchFn: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  renderError: PropTypes.func.isRequired,
  renderLoading: PropTypes.func.isRequired,
}

FetchOrCatch.defaultProps = {
  renderError: (error) => <ErrorDisplay message={error} />,
  renderLoading: () => <LoadingIndicator />,
}
