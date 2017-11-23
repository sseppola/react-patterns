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
        
        if (loading && !loaded) {
          return <LoadingIndicator />
        }

        if (error) {
          return <ErrorDisplay message={errorMsg} />
        }

        if (loaded) {
          return (
            <WrappedComponent
              {...this.props}
              value={this.state.value}
              loading={this.state.loading}
              reload={this._fetchData}
            />
          )
        }

        return null
      }
    }

    return FetchHocWrapper
  }
}