import React from 'react'
import PropTypes from 'prop-types'

export const ErrorDisplay = ({message}) => (
  <div className="bg-red white tc pa3">
    <p>{message}</p>
  </div>
)

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
}