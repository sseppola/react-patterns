import PropTypes from 'prop-types'

const btcIndexPropType = PropTypes.shape({
  base: PropTypes.oneOf(['BTC']),
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
})

export default btcIndexPropType