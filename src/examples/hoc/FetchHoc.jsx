import React from 'react'

import { LoadingIndicator } from '../../components/LoadingIndicator'
import { ErrorDisplay } from '../../components/ErrorDisplay'


export default function FetchHoc(fetchFn) {
  return (WrappedComponent) => {
    class FetchHocWrapper extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          loading: false,
          loaded: false,
          value: null,
          error: null,
        }
        this._fetchData = this._fetchData.bind(this)
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

        fetchFn()
        .then(result => {
          this.setState(() => ({
            value: result,
            loading: false,
            loaded: true,
            error: null,
          }))
        })
        .catch(err => {
          this.setState(() => ({
            loading: false,
            error: err,
          }))
        })
      }

      render() {
        const { loading, loaded, error, errorMsg } = this.state

        if (error) {
          return <ErrorDisplay message={errorMsg} />
        }
        if (loading && !loaded) {
          return <LoadingIndicator />
        }

        if (loaded) {
          const { value: [buy, sell] , ...forwardProps } = this.state
          return (
            <WrappedComponent
              {...this.props}
              btcIndex={{
                ...forwardProps,
                buy,
                sell,
                reload: this._fetchData
              }}
            />
          )
        }

        return null
      }
    }

    return FetchHocWrapper
  }
}