import React from 'react';
import PropTypes from 'prop-types';

const btcIndexPropType = PropTypes.shape({
  base: PropTypes.oneOf(['BTC']),
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
})


DisplayBtcPrice.propTypes = {
  buy: btcIndexPropType,
  sell: btcIndexPropType,
  refreshPrice: PropTypes.func.isRequired,
}

export function DisplayBtcPrice({ buy, sell, refreshPrice }) {
  return (
    <div style={{ cursor: 'pointer'}} onClick={refreshPrice}>
      <p>Buy: {buy.amount} {buy.currency}</p>
      <p>Sell: {sell.amount} {sell.currency}</p>
  </div>
  );
}