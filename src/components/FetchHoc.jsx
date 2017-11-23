import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from './LoadingIndicator'
import { ErrorDisplay } from './ErrorDisplay'


export default function FetchHoc(fetchFn) {
  return (WrappedComponent) => {
    class FetchHocWrapper extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          isLoading: true,
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
          isLoading: true,
        }))

        fetchFn()
        .then(result => {
          this._setState(() => ({
            value: result,
            isLoading: false,
            error: null,
          }))
        })
        .catch(err => {
          this._setState(() => ({
            isLoading: false,
            error: err,
          }))
        })
      }

      _setState() {
        setTimeout(() => this.setState.apply(this, arguments))
      }

      render() {
        const { isLoading, value, error } = this.state

        if (error) {
          return this.props.renderError(error)
        }

        if (isLoading && !value) {
          return this.props.renderLoading()
        }

        return <WrappedComponent {...this.props} value={value} reload={this._fetchData} />
      }
    }

    FetchHocWrapper.propTypes = {
      // fetchFn: PropTypes.func.isRequired,
      render: PropTypes.func.isRequired,
      renderError: PropTypes.func.isRequired,
      renderLoading: PropTypes.func.isRequired,
    }
    
    FetchHocWrapper.defaultProps = {
      renderError: (error) => <ErrorDisplay message={error} />,
      renderLoading: () => <LoadingIndicator />,
    }

    return FetchHocWrapper
  }
}